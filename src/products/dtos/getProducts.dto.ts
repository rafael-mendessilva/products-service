import { IsInt, IsNotEmpty, Min } from 'class-validator'
import { Transform } from 'class-transformer'
export class GetProductsWithPaginationDto {
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => parseInt(value))
  @IsInt()
  @Min(1)
  declare page: number

  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => parseInt(value))
  @IsInt()
  @Min(1)
  declare limit: number
}
