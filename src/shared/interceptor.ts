/* eslint-disable @typescript-eslint/no-misused-promises */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  constructor(private readonly prisma: PrismaService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    const userId = req.user?.id || null;
    const method = req.method;
    const route = req.originalUrl || req.url;
    const params = req.params;
    const query = req.query;
    const body = req.body;

    return next.handle().pipe(
      tap(async () => {
        const statusCode =
          context.switchToHttp().getResponse()?.statusCode ?? 200;

        await this.prisma.log.create({
          data: {
            userId,
            method,
            route,
            status: statusCode,
            params,
            query,
            body,
          },
        });
      }),
    );
  }
}
