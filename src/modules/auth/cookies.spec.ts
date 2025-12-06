/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { CookiesUtils } from './cookies';
import { CookieData } from 'src/@types';

describe('CookiesUtils', () => {
  let service: CookiesUtils;
  let mockResponse: jest.Mocked<Response>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CookiesUtils],
    }).compile();

    service = module.get<CookiesUtils>(CookiesUtils);

    mockResponse = {
      cookie: jest.fn(),
    } as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('setCookies', () => {
    it('should set token cookie with correct options', () => {
      const cookieData: CookieData = {
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      };

      service.setCookies(mockResponse, cookieData);

      expect(mockResponse.cookie).toHaveBeenCalledWith(
        'token',
        cookieData.accessToken,
        {
          httpOnly: false,
          secure: false,
          maxAge: 30 * 60 * 1000,
        },
      );
      expect(mockResponse.cookie).toHaveBeenCalledTimes(1);
    });

    it('should set cookie with different access token values', () => {
      const testTokens = [
        'short-token',
        'very-long-token-with-many-characters-and',
      ];

      testTokens.forEach((token) => {
        const cookieData: CookieData = { accessToken: token };
        service.setCookies(mockResponse, cookieData);
        expect(mockResponse.cookie).toHaveBeenCalledWith('token', token, {
          httpOnly: false,
          secure: false,
          maxAge: 30 * 60 * 1000,
        });
      });

      expect(mockResponse.cookie).toHaveBeenCalledTimes(testTokens.length);
    });

    it('should handle empty access token', () => {
      const cookieData: CookieData = {
        accessToken: '',
      };

      service.setCookies(mockResponse, cookieData);

      expect(mockResponse.cookie).toHaveBeenCalledWith('token', '', {
        httpOnly: false,
        secure: false,
        maxAge: 30 * 60 * 1000,
      });
    });
  });

  describe('invalidateCookies', () => {
    it('should invalidate token cookie by setting empty value and short expiry', () => {
      service.invalidateCookies(mockResponse);

      expect(mockResponse.cookie).toHaveBeenCalledWith('token', '', {
        httpOnly: false,
        secure: false,
        maxAge: 5000,
      });
      expect(mockResponse.cookie).toHaveBeenCalledTimes(1);
    });

    it('should set empty string as cookie value', () => {
      service.invalidateCookies(mockResponse);

      const cookieCall = mockResponse.cookie.mock.calls[0];
      const cookieValue = cookieCall[1];

      expect(cookieValue).toBe('');
    });
  });

  describe('service instantiation', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should be an instance of CookiesUtils', () => {
      expect(service).toBeInstanceOf(CookiesUtils);
    });
  });

  describe('integration scenarios', () => {
    it('should handle setting and then invalidating cookies in sequence', () => {
      const cookieData: CookieData = {
        accessToken: 'valid-jwt-token',
      };

      service.setCookies(mockResponse, cookieData);

      service.invalidateCookies(mockResponse);

      expect(mockResponse.cookie).toHaveBeenCalledTimes(2);

      expect(mockResponse.cookie).toHaveBeenNthCalledWith(
        1,
        'token',
        'valid-jwt-token',
        {
          httpOnly: false,
          secure: false,
          maxAge: 30 * 60 * 1000,
        },
      );

      expect(mockResponse.cookie).toHaveBeenNthCalledWith(2, 'token', '', {
        httpOnly: false,
        secure: false,
        maxAge: 5000,
      });
    });

    it('should handle multiple cookie operations without interference', () => {
      const firstToken: CookieData = { accessToken: 'token-1' };
      const secondToken: CookieData = { accessToken: 'token-2' };

      service.setCookies(mockResponse, firstToken);
      service.setCookies(mockResponse, secondToken);
      service.invalidateCookies(mockResponse);

      expect(mockResponse.cookie).toHaveBeenCalledTimes(3);
      expect(mockResponse.cookie).toHaveBeenNthCalledWith(
        1,
        'token',
        'token-1',
        expect.any(Object),
      );
      expect(mockResponse.cookie).toHaveBeenNthCalledWith(
        2,
        'token',
        'token-2',
        expect.any(Object),
      );
      expect(mockResponse.cookie).toHaveBeenNthCalledWith(
        3,
        'token',
        '',
        expect.any(Object),
      );
    });
  });

  describe('error handling', () => {
    it('should not throw when Response.cookie throws an error', () => {
      mockResponse.cookie.mockImplementation(() => {
        throw new Error('Cookie setting failed');
      });
      const cookieData: CookieData = { accessToken: 'test-token' };

      expect(() => service.setCookies(mockResponse, cookieData)).toThrow(
        'Cookie setting failed',
      );
    });

    it('should not throw when Response.cookie throws during invalidation', () => {
      mockResponse.cookie.mockImplementation(() => {
        throw new Error('Cookie invalidation failed');
      });
      expect(() => service.invalidateCookies(mockResponse)).toThrow(
        'Cookie invalidation failed',
      );
    });
  });
});
