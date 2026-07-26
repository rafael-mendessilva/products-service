import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  Param,
  HttpCode,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common'
import { ProductsService } from './products.service'
import {
  CreateProductDto,
  ProductTokenParamDto,
  UpdateProductDto,
  GetProductsWithPaginationDto,
} from './dtos'
import { GetProductsResponse, GetProductResponse } from './responses'

@UseInterceptors(ClassSerializerInterceptor)
@UsePipes(new ValidationPipe({ transform: true }))
@Controller('v1/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  async getProductsWithPagination(
    @Query() params: GetProductsWithPaginationDto,
  ) {
    const response =
      await this.productsService.getProductsWithPagination(params)

    return new GetProductsResponse(response)
  }
  @Get(':productToken')
  async getProduct(@Param() params: ProductTokenParamDto) {
    const response = await this.productsService.getProduct({
      productToken: params.productToken,
    })

    return new GetProductResponse(response)
  }
  @Put()
  @HttpCode(201)
  async reateProduct(@Body() product: CreateProductDto) {
    await this.productsService.createProduct({ product })
  }
  @Patch(':productToken')
  async updateProduct(
    @Param() params: ProductTokenParamDto,
    @Body() product: UpdateProductDto,
  ) {
    return this.productsService.updateProduct({
      productToken: params.productToken,
      product,
    })
  }
  @Delete(':productToken')
  async deleteProduct(@Param() params: ProductTokenParamDto) {
    return this.productsService.deleteProduct({
      productToken: params.productToken,
    })
  }
}
