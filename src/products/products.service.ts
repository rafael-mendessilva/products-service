import { Injectable } from '@nestjs/common'

@Injectable()
export class ProductsService {
  getProducts() {
    return 'List of products'
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
