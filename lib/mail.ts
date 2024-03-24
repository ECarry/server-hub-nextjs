import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink =
    process.env.NODE_ENV === "production"
      ? `https://server-hub.net/auth/new-verification?token=${token}`
      : `http://localhost:3000/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "Server Hub <admin@server-hub.net>",
    to: email,
    subject: "Confirm your email",
    html: `
      <p>Click <a href="${confirmLink}">here</a> to confirm email.</p>
    `,
  });
};

export const sendRestPasswordEmail = async (email: string, token: string) => {
  const resetLink =
    process.env.NODE_ENV === "production"
      ? `https://server-hub.net/auth/new-password?token=${token}`
      : `http://localhost:3000/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "Server Hub <admin@server-hub.net>",
    to: email,
    subject: "Reset your password",
    html: `
      <p>Click <a href="${resetLink}">here</a> to reset password.</p>
    `,
  });
};

export const sendOTPEmail = async (email: string, code: number) => {
  await resend.emails.send({
    from: "Server Hub <admin@server-hub.net>",
    to: email,
    subject: `Your temporary Server Hub login code is ${code}`,
    html: `
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #333333;">Your Verification Code</h2>
        <p style="color: #666666;">Here is your one-time verification code:</p>
        <div style="background-color: #f0f0f0; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <h3 style="margin: 0; font-size: 24px; color: #333333; text-align: center;">${code}</h3>
        </div>
        <p style="color: #666666;">Please use this code to verify your email address. This code will expire after one use.</p>
        <p style="color: #666666;">If you didn't request this code, you can safely ignore this email.</p>
    </div>
    `,
  });
};
