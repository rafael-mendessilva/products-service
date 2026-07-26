import { Injectable } from '@nestjs/common'
import { ProductsModel } from './models/products.model'
import { InjectModel } from '@nestjs/sequelize'
import { NotFoundError } from '../exceptions/errors'
import {
  CreateProductDto,
  UpdateProductDto,
  GetProductsWithPaginationDto,
} from './dtos'
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(ProductsModel)
    private readonly products: typeof ProductsModel,
  ) {}
  async getProductsWithPagination(params: GetProductsWithPaginationDto) {
    return this.products.findAndCountAll({
      offset: (params.page - 1) * params.limit,
      limit: params.limit,
      order: ['id'],
    })
  }
  async getProduct(params: { productToken: string }) {
    const { productToken } = params
    const products = await this.products.findOne({ where: { productToken } })
    if (!products) throw new NotFoundError('Product not found')
    return products
  }
  async createProduct(params: { product: CreateProductDto }) {
    const { product } = params

    return this.products.create({
      ...product,
      price: product.priceInCents / 100,
    })
  }
  async updateProduct(params: {
    productToken: string
    product: UpdateProductDto
  }) {
    const { productToken, product } = params
    const [affectedCount] = await this.products.update(product, {
      where: { productToken },
    })

    if (affectedCount === 0)
      throw new NotFoundError('Product not updated', {
        cause: 'Product not found',
      })
  }
  async deleteProduct(params: { productToken: string }) {
    const { productToken } = params
    const deletedCount = await this.products.destroy({
      where: { productToken },
    })
    if (deletedCount === 0)
      throw new NotFoundError('Product not deleted', {
        cause: 'Product not found',
      })
  }
}
