import nodemailer from 'nodemailer'

export const createEmailTransporter = () => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.useplunk.com',
    secure: true,
    port: 465,
    auth: {
      user: 'plunk',
      pass: process.env.PLUNK_KEY,
    },
  })

  return transporter
}

/**
 * Generate HTML email template for newsletters
 */
export const generateNewsletterHTML = (
  subject: string,
  content: string,
  previewText?: string
): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f4f4f4;
    }
    .email-container {
      background-color: #ffffff;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .preview-text {
      display: none;
      font-size: 1px;
      color: #ffffff;
      line-height: 1px;
      max-height: 0px;
      max-width: 0px;
      opacity: 0;
      overflow: hidden;
    }
    .content {
      margin-top: 20px;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
      font-size: 12px;
      color: #666;
      text-align: center;
    }
  </style>
</head>
<body>
  ${previewText ? `<div class="preview-text">${previewText}</div>` : ''}
  <div class="email-container">
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      <p>You received this email because you subscribed to our newsletter.</p>
      <p>If you wish to unsubscribe, please contact us.</p>
    </div>
  </div>
</body>
</html>
  `.trim()
}
