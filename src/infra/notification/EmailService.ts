import { injectable } from "inversify";
import nodemailer, { Transporter } from "nodemailer";
import { smtpConfig } from "../../config/smtp";

export interface IEmailService {
  sendEmail(email: string, message: string): Promise<void>;
}
@injectable()
export class EmailService implements IEmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: smtpConfig.host,
      port: smtpConfig.port,
      auth: {
        user: smtpConfig.auth.user,
        pass: smtpConfig.auth.pass,
      },
    });
  }

  async sendEmail(email: string, message: string): Promise<void> {
    await this.transporter.sendMail({
      from: "John Doe <test@gmail.com>",
      to: email,
      subject: "Nova Proposta de Compra",
      text: message,
    });
  }
}
