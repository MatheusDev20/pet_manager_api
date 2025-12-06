/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { Logger } from '@nestjs/common';
import axios from 'axios';
import { WebhookService } from '../webhook-service';
import { se } from 'date-fns/locale';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('WebhookService', () => {
  let service: WebhookService;
  let loggerSpy: jest.SpyInstance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebhookService],
    }).compile();

    service = module.get<WebhookService>(WebhookService);
    service.webhookUrl = 'https://example.com/webhook';
    loggerSpy = jest.spyOn(Logger.prototype, 'log').mockImplementation();
    jest.spyOn(Logger.prototype, 'warn').mockImplementation();
    jest.spyOn(Logger.prototype, 'error').mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fireWebhook', () => {
    it('should send a webhook successfully when WEBHOOK_URL is set', async () => {
      process.env.WEBHOOK_URL = 'https://example.com/webhook';
      const payload = { message: 'test payload', id: 123 };
      mockedAxios.post.mockResolvedValue({ status: 200 });

      await service.fireWebhook(payload);

      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://example.com/webhook',
        payload,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );
      expect(Logger.prototype.log).toHaveBeenCalledWith(
        'Webhook sent to https://example.com/webhook',
      );
    });

    it('should warn and return early when WEBHOOK_URL is not set', async () => {
      service.webhookUrl = undefined;
      const payload = { message: 'test payload' };
      await service.fireWebhook(payload);
      expect(Logger.prototype.warn).toHaveBeenCalledWith('WEBHOOK_URL not set');
      expect(mockedAxios.post).not.toHaveBeenCalled();
    });

    it('should warn and return early when WEBHOOK_URL is empty string', async () => {
      service.webhookUrl = '';
      const payload = { message: 'test payload' };
      await service.fireWebhook(payload);

      expect(Logger.prototype.warn).toHaveBeenCalledWith('WEBHOOK_URL not set');
      expect(mockedAxios.post).not.toHaveBeenCalled();
    });

    it('should log error when axios request fails', async () => {
      // Arrange
      service.webhookUrl = 'https://example.com/webhook';
      const payload = { message: 'test payload' };
      const error = new Error('Network error');
      mockedAxios.post.mockRejectedValue(error);

      // Act
      await service.fireWebhook(payload);

      // Assert
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://example.com/webhook',
        payload,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );
      expect(Logger.prototype.error).toHaveBeenCalledWith(
        'Failed to send webhook',
        error,
      );
    });

    it('should handle different payload types', async () => {
      service.webhookUrl = 'https://example.com/webhook';
      const stringPayload = 'simple string';
      const arrayPayload = [1, 2, 3];
      const objectPayload = { nested: { object: true }, count: 42 };
      mockedAxios.post.mockResolvedValue({ status: 200 });

      await service.fireWebhook(stringPayload);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://example.com/webhook',
        stringPayload,
        { headers: { 'Content-Type': 'application/json' } },
      );

      await service.fireWebhook(arrayPayload);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://example.com/webhook',
        arrayPayload,
        { headers: { 'Content-Type': 'application/json' } },
      );

      await service.fireWebhook(objectPayload);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://example.com/webhook',
        objectPayload,
        { headers: { 'Content-Type': 'application/json' } },
      );

      expect(mockedAxios.post).toHaveBeenCalledTimes(3);
    });

    it('should handle HTTP error responses', async () => {
      // Arrange
      service.webhookUrl = 'https://example.com/webhook';
      const payload = { message: 'test payload' };
      const httpError = {
        response: {
          status: 404,
          statusText: 'Not Found',
          data: 'Webhook endpoint not found',
        },
        message: 'Request failed with status code 404',
      };
      mockedAxios.post.mockRejectedValue(httpError);

      await service.fireWebhook(payload);

      expect(Logger.prototype.error).toHaveBeenCalledWith(
        'Failed to send webhook',
        httpError,
      );
    });

    it('should handle timeout errors', async () => {
      // Arrange
      process.env.WEBHOOK_URL = 'https://example.com/webhook';
      const payload = { message: 'test payload' };
      const timeoutError = new Error('timeout of 5000ms exceeded');
      timeoutError.name = 'ECONNABORTED';
      mockedAxios.post.mockRejectedValue(timeoutError);

      // Act
      await service.fireWebhook(payload);

      // Assert
      expect(Logger.prototype.error).toHaveBeenCalledWith(
        'Failed to send webhook',
        timeoutError,
      );
    });

    it('should use correct headers for the request', async () => {
      service.webhookUrl = 'https://api.example.com/webhooks/callback';
      const payload = { event: 'user_created', timestamp: Date.now() };
      mockedAxios.post.mockResolvedValue({ status: 200 });
      await service.fireWebhook(payload);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://api.example.com/webhooks/callback',
        payload,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );
    });
  });

  describe('service instantiation', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should have a logger instance', () => {
      expect((service as any).logger).toBeDefined();
      expect((service as any).logger.context).toBe('WebhookService');
    });

    it('should read WEBHOOK_URL from environment', () => {
      process.env.WEBHOOK_URL = 'https://test-webhook.com';
      const newService = new WebhookService();
      expect((newService as any).webhookUrl).toBe('https://test-webhook.com');
    });
  });
});
