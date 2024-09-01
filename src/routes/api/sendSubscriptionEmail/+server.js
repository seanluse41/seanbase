import nodemailer from 'nodemailer';
import { json } from '@sveltejs/kit';

function constructEmailContent(subscriptionData, downloadLink, latestVersion) {
    const {
        secretKey,
        customer_name,
        customer_email,
        customer_phone,
        amount,
        current_period_end
    } = subscriptionData;

    return `
サブスクリプションが完了しました。
${customer_name}様、ご登録ありがとうございます。

サブスクリプション詳細:
* 秘密キー: ${secretKey}
* メールアドレス: ${customer_email}
* 電話番号: ${customer_phone}
* 金額: ￥${amount}
* 次回請求日: ${new Date(current_period_end).toLocaleDateString()}

kGuideプラグイン（バージョン ${latestVersion}）のダウンロードリンク:
${downloadLink}
このダウンロードリンクは24時間有効です。

サブスクリプション管理:
サブスクリプションの管理、支払い方法の更新、請求履歴の確認は、以下のStripeカスタマーポータルから行えます：
https://billing.stripe.com/p/login/00g9DZb7Dedw4lWaEE

次のステップ:
1. 上記リンクからkGuideプラグインの最新バージョンをダウンロードしてください。
2. ご自身のkintone環境で、kintoneシステム管理ページからプラグインをインストールします。
3. kintoneアプリにプラグインをインストールします。アプリ制限はございません。
4. アプリのプラグイン設定ページで、歯車アイコンをクリックします。
5. このメールに記載された秘密キーをサブスクリプションキーフィールドに入力します。
6. 「リポジトリアプリを作成」をクリックして、kGuide用のリポジトリを作成します。これにより新しいKintoneアプリが作成されます（初回のみ行う必要があります）。
7. アプリの設定を更新し、初めてのkGuideを作成します。

カスタマーサポートには、admin@seanbase.com またはアプリ内のプラグインの設定画面にあるカスタマーサポートボタンからいつでもお問い合わせいただけます。
ご不明な点やサポートが必要な場合は、お気軽にお問い合わせください。

よろしくお願いいたします。
kGuideチーム
    `;
}

export async function POST({ request, fetch, url }) {
    const subscriptionData = await request.json();
    const emailUser = import.meta.env.VITE_EMAIL_USER;
    const emailPass = import.meta.env.VITE_EMAIL_PASS;

    // Fetch the latest version info
    const versionResponse = await fetch('/api/getKguideUpdate?version=0.0.0');
    const versionData = await versionResponse.json();

    // Generate a secure download link
    const linkResponse = await fetch(`/api/generate-download-link?version=${versionData.latestVersion}`);
    const linkData = await linkResponse.json();
    const downloadLink = linkData.downloadLink;

    const emailContent = constructEmailContent(subscriptionData, downloadLink, versionData.latestVersion);

    let transporter = nodemailer.createTransport({
        host: 'smtp.porkbun.com',
        port: 587,
        secure: false,
        auth: {
            user: emailUser,
            pass: emailPass
        }
    });

    try {
        let info = await transporter.sendMail({
            from: emailUser,
            to: subscriptionData.customer_email,
            subject: 'kGuideサブスクリプション確認',
            text: emailContent,
        });

        return json({ 
            message: 'Email sent successfully', 
            id: info.messageId,
            versionInfo: {
                latestVersion: versionData.latestVersion,
                breakingChange: versionData.breakingChange
            }
        });
    } catch (error) {
        console.error('Error sending email:', error);
        return json({ message: 'Error sending email', error: error.message }, { status: 500 });
    }
}