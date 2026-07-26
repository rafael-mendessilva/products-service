import {
  Catch,
  ArgumentsHost,
  NotFoundException,
  ConflictException,
} from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { NotFoundError } from './errors'
import { UniqueConstraintError } from 'sequelize'

@Catch()
export class HandleExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    if (exception instanceof NotFoundError) {
      throw new NotFoundException(exception.message, exception.cause as string)
    }
    if (exception instanceof UniqueConstraintError) {
      throw new ConflictException(exception.message, exception.cause as string)
    }
    super.catch(exception, host)
  }
}
