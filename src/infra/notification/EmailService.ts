import { injectable } from "inversify";

export interface IEmailService {
  sendEmail(email: string, message: string): Promise<void>;
}

@injectable()
export class EmailService implements IEmailService {
  async sendEmail(email: string, message: string): Promise<void> {
    console.log(`Email sent to ${email}: ${message}`);
  }
}