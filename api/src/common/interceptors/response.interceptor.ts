import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  
export interface Response<T> {
  data: T;
  metadata: {
    timestamp: string;
    path: string;
    statusCode: number;
  };
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    return next.handle().pipe(
      map(data => ({
        data,
        metadata: {
          timestamp: new Date().toISOString(),
          path: request.url,
          statusCode: response.statusCode,
        },
      })),
    );
  }
}