import nodeMailer from "nodemailer";

export const sendEmail = async ({ email, subject, message, html }) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // Build email options dynamically based on provided fields
  const options = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: subject,
    ...(html ? { html } : { text: message }), // Use 'html' if provided, otherwise 'text'
  };

  await transporter.sendMail(options);
};
