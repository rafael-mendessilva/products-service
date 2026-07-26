/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator'

class BaseProductDto {
  @IsNotEmpty()
  @IsInt()
  declare stock: number
}

export class CreateProductDto extends BaseProductDto {
  @IsNotEmpty()
  @IsString()
  declare productToken: string

  @IsNotEmpty()
  @IsString()
  declare name: string

  @IsNotEmpty()
  @IsInt()
  declare priceInCents: number

  @Min(1)
  declare stock: number
}

export class UpdateProductDto extends BaseProductDto {
  @Min(0)
  declare stock: number
}
