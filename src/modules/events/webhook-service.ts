import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name);
  private readonly webhookUrl = process.env.WEBHOOK_URL;

  async fireWebhook<T>(payload: T) {
    if (!this.webhookUrl) {
      this.logger.warn('WEBHOOK_URL not set');
      return;
    }

    try {
      await axios.post(this.webhookUrl, payload, {
        headers: { 'Content-Type': 'application/json' },
      });
      this.logger.log(`Webhook sent to ${this.webhookUrl}`);
    } catch (error) {
      this.logger.error('Failed to send webhook', error);
    }
  }
}
