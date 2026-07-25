import { Controller, Delete, Get, Post, Put } from '@nestjs/common'
import { ProductsService } from './products.service'

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  getProducts() {
    return this.productsService.getProducts()
  }
  @Get(':id')
  getProductById() {
    return this.productsService.getProductById()
  }
  @Put()
  createProduct() {
    return this.productsService.createProduct()
  }
  @Post(':id')
  updateProduct() {
    return this.productsService.updateProduct()
  }
  @Delete(':id')
  deleteProduct() {
    return this.productsService.deleteProduct()
  }
}
