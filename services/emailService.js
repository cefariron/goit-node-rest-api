import nodemailer from "nodemailer";
import path from "path";

export class EmailService {
  constructor(user, url) {
    (this.to = user.email),
      (this.url = url),
      (this.from = process.env.EMAIL_FROM);
  }
}
