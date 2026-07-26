import { Injectable } from '@nestjs/common'
import { ProductsModel } from './products.model'
import { InjectModel } from '@nestjs/sequelize'
import { CreateProductDto, UpdateProductDto } from './dtos'
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(ProductsModel)
    private readonly products: typeof ProductsModel,
  ) {}
  async getProducts() {
    return this.products.findAll()
  }
  async getProduct(params: { productToken: string }) {
    const { productToken } = params
    return this.products.findOne({ where: { productToken } })
  }
  async createProduct(params: { product: CreateProductDto }) {
    const { product } = params
    return (
      await this.products.create({
        ...product,
        price: product.priceInCents / 100,
      })
    ).productToken
  }
  async updateProduct(params: {
    productToken: string
    product: UpdateProductDto
  }) {
    const { productToken, product } = params
    return this.products.update(product, {
      where: { productToken },
    })
  }
  async deleteProduct(params: { productToken: string }) {
    const { productToken } = params
    return this.products.destroy({ where: { productToken } })
  }
}
