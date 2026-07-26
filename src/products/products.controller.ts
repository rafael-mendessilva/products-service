import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  Param,
  HttpCode,
  Patch,
} from '@nestjs/common'
import { ProductsService } from './products.service'
import {
  CreateProductDto,
  ProductTokenParamDto,
  UpdateProductDto,
} from './dtos'
@Controller('v1/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  getProducts() {
    return this.productsService.getProducts()
  }
  @Get(':productToken')
  getProduct(@Param() params: ProductTokenParamDto) {
    return this.productsService.getProduct({
      productToken: params.productToken,
    })
  }
  @Put()
  @HttpCode(201)
  createProduct(@Body() product: CreateProductDto) {
    return this.productsService.createProduct({ product })
  }
  @Patch(':productToken')
  updateProduct(
    @Param() params: ProductTokenParamDto,
    @Body() product: UpdateProductDto,
  ) {
    return this.productsService.updateProduct({
      productToken: params.productToken,
      product,
    })
  }
  @Delete(':productToken')
  deleteProduct(@Param() params: ProductTokenParamDto) {
    return this.productsService.deleteProduct({
      productToken: params.productToken,
    })
  }
}
