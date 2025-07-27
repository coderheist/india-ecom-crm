import { sql } from "@vercel/postgres";
import { hash } from "bcryptjs";
import { nanoid } from "nanoid";
import nodemailer from "nodemailer";

// Create a test account for email sending
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return Response.json({ error: "Email is required" }, { status: 400 });
    }

    // Check if user exists
    const { rows } = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;

    if (rows.length === 0) {
      return Response.json(
        { error: "No account found with this email" },
        { status: 404 }
      );
    }

    // Generate reset token
    const resetToken = nanoid(32);
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    // Store reset token in database
    await sql`
      UPDATE users 
      SET reset_token = ${resetToken}, 
          reset_token_expiry = ${resetTokenExpiry} 
      WHERE email = ${email}
    `;

    // Send reset email
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;
    
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset your CRM Heist password",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(to right, #2563eb, #9333ea); padding: 20px; text-align: center; color: white; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0;">Reset Your Password</h1>
          </div>
          <div style="padding: 20px; border: 1px solid #e5e7eb; border-radius: 0 0 10px 10px;">
            <p>Hello,</p>
            <p>We received a request to reset your password for your CRM Heist account. Click the button below to reset it:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" style="background: linear-gradient(to right, #2563eb, #9333ea); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Reset Password</a>
            </div>
            <p>This link will expire in 1 hour for security reasons.</p>
            <p>If you didn't request this reset, you can safely ignore this email.</p>
            <p style="margin-top: 30px; color: #6b7280; font-size: 14px;">Best regards,<br>The CRM Heist Team</p>
          </div>
        </div>
      `,
    });

    return Response.json({ 
      message: "Password reset instructions sent to your email" 
    }, { status: 200 });

  } catch (error) {
    console.error("Forgot password error:", error);
    return Response.json(
      { error: "Failed to process password reset request" },
      { status: 500 }
    );
  }
}
