import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Response, HttpException, HttpStatus } from '@nestjs/common';

export interface Response<T> {
  statusCode: number;
  message: string;
  data: T;
}

@Injectable()
export class WrapResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const status = context.switchToHttp().getResponse().statusCode === 201 ? 201 : 200;

    // Before Middleware
    context.switchToHttp().getResponse().status(status);

    return next.handle().pipe(
      map((data) => {
        let message = 'success';

        if (data.message) {
          message = data.message;
          delete data.message;
          if (Object.values(data).length === 0) {
            data = message;
          }
        }

        return {
          statusCode: status,
          message,
          data,
          service: 'task-management-service',
          timestamp: new Date().toISOString(),
        };
      }),
      catchError((err: HttpException) => {
        console.log('\n======= Interceptor Error =======');
        console.log(JSON.stringify(err, null, 2));
        console.log('=================================\n');

        const statusCode: number = (err.getStatus && err.getStatus()) || HttpStatus.INTERNAL_SERVER_ERROR;
        const errorResponse: any = (err.getResponse && err.getResponse()) || { message: 'internal_server_error', data: false };

        throw new HttpException(
          {
            statusCode,
            message: errorResponse?.message,
            data: errorResponse?.data,
            service: 'task-management-service',
            timestamp: new Date().toISOString(),
          },
          statusCode,
        );
      }),
    );
  }
}
