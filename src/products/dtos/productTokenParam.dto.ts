/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsString } from 'class-validator'

export class ProductTokenParamDto {
  @IsNotEmpty()
  @IsString()
  declare productToken: string
}
