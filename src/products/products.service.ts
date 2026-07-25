import { Injectable } from '@nestjs/common'
import { Products } from './products.model'
import { InjectModel } from '@nestjs/sequelize'
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products)
    private readonly products: typeof Products,
  ) {}
  async getProducts() {
    const response = await this.products.findAll()
    return response[0].id
  }
  getProductById() {
    return 'Product details'
  }
  createProduct() {
    return 'Product created successfully'
  }
  updateProduct() {
    return 'Product updated successfully'
  }
  deleteProduct() {
    return 'Product deleted successfully'
  }
}
