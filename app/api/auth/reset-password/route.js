import { sql } from "@vercel/postgres";
import { hash } from "bcryptjs";

export async function POST(req) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return Response.json(
        { error: "Token and password are required" },
        { status: 400 }
      );
    }

    // Find user with valid reset token
    const { rows } = await sql`
      SELECT * FROM users 
      WHERE reset_token = ${token} 
      AND reset_token_expiry > NOW()
    `;

    if (rows.length === 0) {
      return Response.json(
        { error: "Invalid or expired reset token" },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await hash(password, 12);

    // Update password and clear reset token
    await sql`
      UPDATE users 
      SET password = ${hashedPassword},
          reset_token = NULL,
          reset_token_expiry = NULL
      WHERE reset_token = ${token}
    `;

    return Response.json({ 
      message: "Password reset successful" 
    }, { status: 200 });

  } catch (error) {
    console.error("Reset password error:", error);
    return Response.json(
      { error: "Failed to reset password" },
      { status: 500 }
    );
  }
}
