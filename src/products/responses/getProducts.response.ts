import { Transform } from 'class-transformer'
import { ProductsModel } from '../models/products.model'

class ProductResponse {
  declare productToken: string
  declare name: string
  @Transform(({ value }: { value: number }) => value.toString() + ' €')
  declare price: number
  declare stock: number
  constructor(params: ProductsModel) {
    this.productToken = params.productToken
    this.name = params.productToken
    this.price = params.price
    this.stock = params.stock
  }
}

export class GetProductsResponse {
  declare data: ProductResponse[]
  declare total: number
  constructor(params: { rows: ProductsModel[]; count: number }) {
    this.data = params.rows.map((product) => new ProductResponse(product))
    this.total = params.count
  }
}

export class GetProductResponse extends ProductResponse {
  constructor(params: ProductsModel) {
    super(params)
  }
}
