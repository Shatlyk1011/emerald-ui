import { NextRequest, NextResponse } from 'next/server';
import { createEmailTransporter, generateNewsletterHTML } from '@/lib/email.config';









export async function POST(request: NextRequest) {
  try {
    const transporter = createEmailTransporter()
    const { to } = await request.json()

    await transporter.sendMail({
      from: `${process.env.EMAIL_FROM || 'Node Ui Newsletter'} <https://ui-application-lac.vercel.app>`,
      to: 'gj_wp@mail.ru',
      subject: 'Test Email - Newsletter System',
      html: generateNewsletterHTML(
        'Test Email',
        '<h1>Test Email</h1><p>Your newsletter system is configured correctly!</p>',
        'This is a test email'
      ),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Test email failed:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send test email' },
      { status: 500 }
    )
  }
}
