import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import notoFontUrl from '$lib/NotoSansJP-Regular.ttf';
import companyLogoUrl from '$lib/logo-cropped.png';
import { assets } from '$app/paths';

export async function GET({ url }) {
    // Extract query parameters (unchanged)
    const customerName = url.searchParams.get('customer_name') || 'Valued Customer';
    const customerEmail = url.searchParams.get('customer_email') || 'N/A';
    const customerPhone = url.searchParams.get('customer_phone') || 'N/A';
    const amount = url.searchParams.get('amount') || '0';
    const currency = url.searchParams.get('currency') || 'JPY';
    const product = url.searchParams.get('product') || 'Kintone Development'

    // Create a new PDF document (A4 size)
    const pdfDoc = await PDFDocument.create();

    // Register fontkit with the PDF document
    pdfDoc.registerFontkit(fontkit);

    const page = pdfDoc.addPage([595.28, 841.89]); // A4 size in points
    const { height, width } = page.getSize();

    // Load and embed a custom font that supports Japanese characters
    const fontResponse = await fetch(`${assets}/NotoSansJP-Regular.ttf`);
    const fontArrayBuffer = await fontResponse.arrayBuffer();
    const customFont = await pdfDoc.embedFont(fontArrayBuffer);

    // Define styles
    const fontSize = 14;
    const lineHeight = 20;
    const margin = 50;
    const cellPadding = 5; // New variable for cell padding

    // Helper function to draw a horizontal line
    const drawHorizontalLine = (y) => {
        page.drawLine({
            start: { x: margin, y },
            end: { x: width - margin, y },
            thickness: 1,
            color: rgb(0, 0, 0),
        });
    };

    // Draw header: 領収書
    page.drawText('領収書', {
        x: width / 2 - 50, // Approximate center
        y: height - margin,
        size: 24,
        font: customFont,
        color: rgb(0, 0, 0),
    });

    // Draw first horizontal line
    drawHorizontalLine(height - margin - 30);

    // Customer information (left side)
    page.drawText(`${customerName}様`, {
        x: margin,
        y: height - margin - 60,
        size: fontSize,
        font: customFont,
        color: rgb(0, 0, 0),
    });
    page.drawText(`Email: ${customerEmail}`, {
        x: margin,
        y: height - margin - 80,
        size: fontSize,
        font: customFont,
        color: rgb(0, 0, 0),
    });
    page.drawText(`Phone: ${customerPhone}`, {
        x: margin,
        y: height - margin - 100,
        size: fontSize,
        font: customFont,
        color: rgb(0, 0, 0),
    });

    // Date (right side)
    const today = new Date();
    const dateString = `発行日：${today.getFullYear()}年${String(today.getMonth() + 1).padStart(2, '0')}月${String(today.getDate()).padStart(2, '0')}日`;
    page.drawText(dateString, {
        x: width - margin - 200, // Adjust as needed
        y: height - margin - 60,
        size: fontSize,
        font: customFont,
        color: rgb(0, 0, 0),
    });

    // Draw second horizontal line
    drawHorizontalLine(height - margin - 120);

    // Amount
    page.drawText(`金額：￥${amount}`, {
        x: width / 2 - 50, // Approximate center
        y: height - margin - 160,
        size: 18,
        font: customFont,
        color: rgb(0, 0, 0),
    });

    // Confirmation text
    page.drawText('上記正に領収いたしました', {
        x: width / 2 - 80,
        y: height - margin - 190,
        size: fontSize,
        font: customFont,
        color: rgb(0, 0, 0),
    });

    // Add "但し" line
    page.drawText('但し', {
        x: width / 2 - 80,
        y: height - margin - 210,
        size: fontSize,
        font: customFont,
        color: rgb(0, 0, 0),
    });

    // Draw third horizontal line
    drawHorizontalLine(height - margin - 230);

    // Draw table
    const tableTop = height - margin - 250;
    const tableBottom = tableTop - 60; // Adjust this value based on the number of rows
    const col1 = margin;
    const col2 = width / 2;
    const col3 = width - margin - 100;

    // Draw table borders
    page.drawLine({ start: { x: col1, y: tableTop }, end: { x: width - margin, y: tableTop }, color: rgb(0, 0, 0) });
    page.drawLine({ start: { x: col1, y: tableBottom }, end: { x: width - margin, y: tableBottom }, color: rgb(0, 0, 0) });
    page.drawLine({ start: { x: col1, y: tableTop }, end: { x: col1, y: tableBottom }, color: rgb(0, 0, 0) });
    page.drawLine({ start: { x: col2, y: tableTop }, end: { x: col2, y: tableBottom }, color: rgb(0, 0, 0) });
    page.drawLine({ start: { x: col3, y: tableTop }, end: { x: col3, y: tableBottom }, color: rgb(0, 0, 0) });
    page.drawLine({ start: { x: width - margin, y: tableTop }, end: { x: width - margin, y: tableBottom }, color: rgb(0, 0, 0) });

    // Draw light gray header with opacity
    page.drawRectangle({
        x: col1,
        y: tableTop - 30,
        width: width - 2 * margin,
        height: 30,
        color: rgb(0.9, 0.9, 0.9),
        opacity: 0.5,
    });

    // Draw table headers
    const headerY = tableTop - 20;
    page.drawText('商品名', { x: col1 + cellPadding, y: headerY - cellPadding, size: fontSize, font: customFont });
    page.drawText('数量', { x: col2 + cellPadding, y: headerY - cellPadding, size: fontSize, font: customFont });
    page.drawText('金額', { x: col3 + cellPadding, y: headerY - cellPadding, size: fontSize, font: customFont });

    // Draw table row (without background rectangle)
    const rowY = tableTop - 40;
    page.drawText(product, { x: col1 + cellPadding, y: rowY - cellPadding, size: fontSize, font: customFont });
    page.drawText('1', { x: col2 + cellPadding, y: rowY - cellPadding, size: fontSize, font: customFont });
    page.drawText(`￥${amount}`, { x: col3 + cellPadding, y: rowY - cellPadding, size: fontSize, font: customFont });

    // Read and embed the logo
    try {
        const logoResponse = await fetch(`${assets}/logo-cropped.png`);
        const logoArrayBuffer = await logoResponse.arrayBuffer();
        const logo = await pdfDoc.embedPng(logoArrayBuffer);

        // Calculate scaling factor to fit logo within a 125x125 point box (25% larger than before)
        const maxDimension = 125;
        const scaleFactor = Math.min(maxDimension / logo.width, maxDimension / logo.height);
        const logoDims = logo.scale(scaleFactor);

        // Draw the logo in the bottom-right corner
        page.drawImage(logo, {
            x: width - logoDims.width - margin,
            y: margin + 100, // Adjust this value to position the logo above the company info
            width: logoDims.width,
            height: logoDims.height,
        });

        // Add business information beneath the logo
        const businessInfo = [
            'Seanco',
            '〒114-0022',
            '東京都北区王子本町２−１５−７',
            '090-9141-0841',
            '代表：Luse Sean（ルース　ショーン）',
        ];

        businessInfo.forEach((line, index) => {
            page.drawText(line, {
                x: width - margin - 150, // Align with logo, assuming logo width <= 150
                y: margin + 80 - lineHeight * index, // Position text below the logo
                size: 10,
                font: customFont,
                color: rgb(0, 0, 0),
            });
        });

    } catch (error) {
        console.error('Error loading or drawing logo:', error);
        page.drawText('Logo not available: ' + error.message, {
            x: width - margin - 150,
            y: margin + 100,
            size: 12,
            font: customFont,
            color: rgb(1, 0, 0), // Red color
        });
    }

    // Generate the PDF bytes
    const pdfBytes = await pdfDoc.save();

    // Return the PDF as a downloadable file
    return new Response(pdfBytes, {
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="receipt-${new Date().toISOString().split('T')[0]}.pdf"`,
        },
    });
}