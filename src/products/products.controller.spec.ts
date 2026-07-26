import { Test, TestingModule } from '@nestjs/testing'
import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'

import { InferAttributes } from 'sequelize'
import { ProductsModel } from './products.model'
import { describe, expect, it, beforeEach, jest } from '@jest/globals'

type ProductModelType = InferAttributes<ProductsModel>
describe('ProductsController', () => {
  let controller: ProductsController
  let service: ProductsService
  let mockedProducts: ProductModelType
  beforeEach(async () => {
    mockedProducts = {
      productToken: 'mocked-product-token',
      name: 'Mocked Product',
      price: 10.22,
      stock: 10,
    } satisfies ProductModelType

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            getProducts: jest.fn().mockImplementation(() => [mockedProducts]),
            getProduct: jest.fn().mockImplementation(() => mockedProducts),
            createProduct: jest
              .fn()
              .mockImplementation(() => mockedProducts.productToken),
            updateProduct: jest.fn(),
            deleteProduct: jest.fn(),
          },
        },
      ],
    }).compile()

    controller = module.get<ProductsController>(ProductsController)
    service = module.get<ProductsService>(ProductsService)
  })

  it('should retrieve list of products', () => {
    const products = controller.getProducts()
    expect(products).toEqual([mockedProducts])
    expect(service.getProducts).toHaveBeenCalled()
  })

  it('should retrieve a product by token', () => {
    const product = controller.getProduct({
      productToken: 'mocked-product-token',
    })
    expect(product).toEqual(mockedProducts)
    expect(service.getProduct).toHaveBeenCalledWith({
      productToken: 'mocked-product-token',
    })
  })

  it('should create a new product', () => {
    const newProduct = {
      productToken: 'new-product-token',
      name: 'New Product',
      priceInCents: 1022,
      stock: 10,
    }
    const productToken = controller.createProduct(newProduct)
    expect(productToken).toEqual(mockedProducts.productToken)
    expect(service.createProduct).toHaveBeenCalledWith({ product: newProduct })
  })

  it('should update a product', () => {
    const updatedProduct = {
      stock: 15,
    }
    controller.updateProduct(
      { productToken: 'mocked-product-token' },
      updatedProduct,
    )
    expect(service.updateProduct).toHaveBeenCalledWith({
      productToken: 'mocked-product-token',
      product: updatedProduct,
    })
  })

  it('should delete a product', () => {
    controller.deleteProduct({ productToken: 'mocked-product-token' })
    expect(service.deleteProduct).toHaveBeenCalledWith({
      productToken: 'mocked-product-token',
    })
  })
})
