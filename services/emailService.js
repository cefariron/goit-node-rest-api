import { convert } from "html-to-text";
import nodemailer from "nodemailer";
import path from "path";
import pug from "pug";

export class EmailService {
  constructor(user, url) {
    this.to = user.email;
    this.url = url;
    this.from = process.env.EMAIL_FROM;
  }

  _initTransport() {
    const transportConfig = {
      host: process.env.MAILGUN_HOST,
      port: process.env.MAILGUN_PORT,
      auth: {
        user: process.env.MAILGUN_USER,
        pass: process.env.MAILGUN_PASS,
      },
    };
    return nodemailer.createTransport(transportConfig);
  }

  async _send(template, subject, verifyUrl) {
    const html = pug.renderFile(
      path.join(process.cwd(), "views", `${template}.pug`),
      { verifyUrl }
    );

    const emailConfig = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: convert(html),
    };

    await this._initTransport().sendMail(emailConfig);
  }

  async sendVerifyLink(verifyUrl) {
    await this._send("verifyEmail", "Confirm your email", verifyUrl);
  }
}
