import { Test, TestingModule } from '@nestjs/testing'

import { ProductsService } from './products.service'
import { getModelToken } from '@nestjs/sequelize'
import { InferAttributes } from 'sequelize'
import { ProductsModel } from './models/products.model'
import { beforeEach, describe, it, expect, jest } from '@jest/globals'
type ProductModelType = InferAttributes<ProductsModel>
describe('ProductsService', () => {
  let service: ProductsService
  let model: typeof ProductsModel
  let mockedProducts: ProductModelType
  beforeEach(async () => {
    mockedProducts = {
      productToken: 'mocked-product-token',
      name: 'Mocked Product',
      price: 10.22,
      stock: 10,
    } satisfies ProductModelType

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getModelToken(ProductsModel),
          useValue: {
            findAll: jest
              .fn()
              .mockImplementation(() => Promise.resolve([mockedProducts])),
            findOne: jest
              .fn()
              .mockImplementation(() => Promise.resolve(mockedProducts)),
            create: jest
              .fn()
              .mockImplementation(() => Promise.resolve(mockedProducts)),
            update: jest.fn(),
            destroy: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<ProductsService>(ProductsService)
    model = module.get<typeof ProductsModel>(getModelToken(ProductsModel))
  })

  it('should retrieve list of products', async () => {
    const products = await service.getProducts()
    expect(products).toEqual([mockedProducts])
    expect(model.findAll).toHaveBeenCalled()
  })

  it('should retrieve a product by token', async () => {
    const product = await service.getProduct({
      productToken: 'mocked-product-token',
    })
    expect(product).toEqual(mockedProducts)
    expect(model.findOne).toHaveBeenCalledWith({
      where: { productToken: 'mocked-product-token' },
    })
  })

  it('should create a new product', async () => {
    const newProduct = {
      productToken: 'new-product-token',
      name: 'New Product',
      priceInCents: 1022,
      stock: 10,
    }
    const productToken = await service.createProduct({ product: newProduct })
    expect(productToken).toEqual(mockedProducts.productToken)
    expect(model.create).toHaveBeenCalledWith({
      ...newProduct,
      price: newProduct.priceInCents / 100,
    })
  })

  it('should update a product', () => {
    const updatedProduct = {
      stock: 15,
    }
    service.updateProduct({
      productToken: 'mocked-product-token',
      product: updatedProduct,
    })
    expect(model.update).toHaveBeenCalledWith(updatedProduct, {
      where: { productToken: 'mocked-product-token' },
    })
  })

  it('should delete a product', () => {
    service.deleteProduct({ productToken: 'mocked-product-token' })
    expect(model.destroy).toHaveBeenCalledWith({
      where: { productToken: 'mocked-product-token' },
    })
  })
})
