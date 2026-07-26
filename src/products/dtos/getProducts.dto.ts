import { IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator'
import { Transform } from 'class-transformer'
export class GetProductsWithPaginationDto {
  @IsOptional()
  @Transform(({ value }: { value: string }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  declare page: number

  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  declare limit: number
}
