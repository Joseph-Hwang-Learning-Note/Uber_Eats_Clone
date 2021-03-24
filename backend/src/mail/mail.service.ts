import got from 'got';
import * as FormData from 'form-data';
import { Inject, Injectable } from '@nestjs/common';
import { MailModuleOptions, EmailVar } from '@mail/mail.interfaces';
import { CONFIG_OPTIONS } from '@common/common.constants';
// import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions, // private readonly configService: ConfigService,
  ) {}

  // You need to pass 'to' in real situation
  private async sendEmail(
    subject: string,
    // to:string, there would be an email which needs verification
    template: string,
    emailVars: EmailVar[],
  ) {
    const form = new FormData();
    form.append(
      'from',
      `Joseph from Uber Eats Clone <mailgun@${this.options.domain}>`,
    );
    form.append('to', `joseph95501@gmail.com`); // You need to pass 'to' variable in real situation
    form.append('subject', subject);
    form.append('template', template);
    emailVars.forEach((eVar) => form.append(`v:${eVar.key}`, eVar.value));
    try {
      await got(`https://api.mailgun.net/v3/${this.options.domain}/messages/`, {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `api:${this.options.apiKey}`,
          ).toString('base64')}`,
        },
        body: form,
        method: 'POST',
      });
    } catch (error) {
      console.error(error);
    }
  }

  sendVerificationEmail(email: string, code: string) {
    this.sendEmail(
      'Please Verify Your Account!',
      'ubereatsclone_email_confirm',
      [
        { key: 'code', value: code },
        { key: 'username', value: email },
      ],
    );
  }
}
