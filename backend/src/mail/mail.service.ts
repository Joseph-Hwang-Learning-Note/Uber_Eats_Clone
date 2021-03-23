import got from 'got';
import * as FormData from 'form-data';
import { Inject, Injectable } from '@nestjs/common';
import { MailModuleOptions } from '@mail/mail.interfaces';
import { CONFIG_OPTIONS } from '@common/common.constants';
// import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions, // private readonly configService: ConfigService,
  ) {
    this.sendEmail('testing', 'test');
  }

  // You need to pass 'to' in real situation
  private sendEmail(subject: string, content: string) {
    const form = new FormData();
    form.append('from', `User <mailgun@${this.options.domain}>`);
    form.append('to', `joseph95501@gmail.com`); // You need to pass 'to' variable in real situation
    form.append('subject', subject);
    form.append('text', content);
    got(`https://api.mailgun.net/v3/${this.options.domain}/messages/`, {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `api:${this.options.apiKey}`,
        ).toString('base64')}`,
      },
      body: form,
      method: 'POST',
    });
  }
}
