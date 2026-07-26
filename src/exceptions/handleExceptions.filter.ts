import { Catch, ArgumentsHost, NotFoundException } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { NotFoundError } from './errors'

@Catch()
export class HandleExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    if (exception instanceof NotFoundError) {
      throw new NotFoundException(exception.message, exception.cause as string)
    }
    super.catch(exception, host)
  }
}
