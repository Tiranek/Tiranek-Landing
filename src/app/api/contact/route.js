import nodemailer from "nodemailer"
import { NextResponse } from "next/server"

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 },
      )
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587", 10),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: `"Tiranek Contact" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO || "tiranek.startup@gmail.com",
      replyTo: email,
      subject: subject
        ? `[Tiranek Contact] ${subject}`
        : `[Tiranek Contact] New message from ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #f5f6f2; padding: 40px 20px;">
          <div style="background: #ffffff; border-radius: 14px; overflow: hidden; box-shadow: 0 4px 24px rgba(10,22,40,0.08);">
            <!-- Header -->
            <div style="background: #0a1628; padding: 32px 40px; display: flex; align-items: center; gap: 12px;">
              <span style="color: #ffffff; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">Tiranek</span>
            </div>
            <!-- Body -->
            <div style="padding: 40px;">
              <h2 style="color: #0a1628; font-size: 20px; font-weight: 700; margin: 0 0 8px;">New Contact Message</h2>
              <p style="color: #6b7c6d; font-size: 14px; margin: 0 0 32px;">Someone reached out via the Tiranek contact form.</p>
              <div style="background: #f5f6f2; border-radius: 10px; padding: 24px; margin-bottom: 24px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #6b7c6d; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; width: 80px;">Name</td>
                    <td style="padding: 8px 0; color: #0a1628; font-size: 15px; font-weight: 600;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7c6d; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Email</td>
                    <td style="padding: 8px 0; color: #3d7a52; font-size: 15px;"><a href="mailto:${email}" style="color: #3d7a52;">${email}</a></td>
                  </tr>
                  ${subject ? `<tr><td style="padding: 8px 0; color: #6b7c6d; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Subject</td><td style="padding: 8px 0; color: #0a1628; font-size: 15px;">${subject}</td></tr>` : ""}
                </table>
              </div>
              <div>
                <p style="color: #6b7c6d; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">Message</p>
                <div style="background: #f5f6f2; border-left: 3px solid #4ade80; border-radius: 6px; padding: 20px; color: #0a1628; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${message}</div>
              </div>
            </div>
            <!-- Footer -->
            <div style="background: #f5f6f2; border-top: 1px solid #dce8dd; padding: 20px 40px; text-align: center;">
              <p style="color: #6b7c6d; font-size: 12px; margin: 0;">This message was sent via the Tiranek contact form. Reply directly to respond to ${name}.</p>
            </div>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Contact form error:", err)
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 },
    )
  }
}
