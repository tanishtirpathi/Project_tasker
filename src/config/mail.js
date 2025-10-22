import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Tasker",
      link: "https://x.com/tanishtirpathi",
    },
  });
  const emailText = mailGenerator.generatePlaintext(options.mailGenContent);

  const emailBody = mailGenerator.generate(options.mailGenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_TRAP_EMAIL_HOST,
    port: process.env.MAIL_TRAP_EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_TRAP_USER,
      pass: process.env.MAIL_TRAP_PASSWORD,
    },
  });

  const mail = {
    from: "mai.taskmanager@example.com",
    to: options.email,
    subject: options.subject,
    text: emailText,
    html: emailBody,
  };
  try {
    await transporter.sendMail(mail);
    console.log("mail send ho gya bsdk ");
  } catch (error) {
    console.error(`email faild ho gya hai bevkoof  ${error}`);
  }
};

const EmailVerificationMailGenContent = (username, veriificationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to Tasker! We're very excited to have you on board.",
      action: {
        instructions: "To get started with Tasker, please click here:",
        button: {
          color: "rgba(255, 17, 17, 1)", // Optional action button color
          text: "Confirm your account",
          link: veriificationUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};
const PasswordResetMailGenContent = (username, PasswordResetUrl) => {
  return {
    body: {
      name: username,
      intro: "change your password from here .",
      action: {
        instructions: "Password change kar le bsdk yaha se ",
        button: {
          color: "rgba(255, 17, 17, 1)", // Optional action button color
          text: " yaha ungli kar password change karne ke liye ",
          link: PasswordResetUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};
