import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fs from "fs/promises";
import path from "path";
async function GET({ url }) {
  const customerName = url.searchParams.get("customer_name") || "Valued Customer";
  const customerEmail = url.searchParams.get("customer_email") || "N/A";
  const amount = url.searchParams.get("amount") || "0";
  const currency = url.searchParams.get("currency") || "USD";
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]);
  const { height, width } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontSize = 12;
  const lineHeight = 20;
  const margin = 50;
  page.drawRectangle({
    x: 0,
    y: height - 100,
    width,
    height: 100,
    color: rgb(136 / 255, 117 / 255, 181 / 255)
    // #8875b5
  });
  const logoPath = path.join(process.cwd(), "src", "lib", "logo-cropped.png");
  const logoImage = await fs.readFile(logoPath);
  const logo = await pdfDoc.embedPng(logoImage);
  const logoDims = logo.scale(0.5);
  page.drawImage(logo, {
    x: margin,
    y: height - 90,
    width: logoDims.width,
    height: logoDims.height
  });
  page.drawText("Receipt", {
    x: width / 2,
    y: height - 150,
    size: 24,
    font: boldFont,
    color: rgb(0, 0, 0)
  });
  const content = [
    `Customer Name: ${customerName}`,
    `Email: ${customerEmail}`,
    `Amount: ${amount} ${currency.toUpperCase()}`,
    `Date: ${(/* @__PURE__ */ new Date()).toLocaleDateString()}`
  ];
  content.forEach((text, index) => {
    page.drawText(text, {
      x: margin,
      y: height - 200 - lineHeight * index,
      size: fontSize,
      font,
      color: rgb(0, 0, 0)
    });
  });
  const pdfBytes = await pdfDoc.save();
  return new Response(pdfBytes, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="receipt-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.pdf"`
    }
  });
}
export {
  GET
};
