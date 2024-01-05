import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (
  email: string,
  token: string,
) => {
  const confirmLink = process.env.NODE_ENV === 'production' 
  ? `http://server-hub.net/auth/new-verification?token=${token}`
  : `http://localhost:3000/auth/new-verification?token=${token}`

  await resend.emails.send({
    from: 'admin@server-hub.net',
    to: email,
    subject: 'Confirm your email',
    html: `
      <p>Click <a href="${confirmLink}">here</a> to confirm email.</p>
    `
  });

}
