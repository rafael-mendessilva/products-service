import { Test, TestingModule } from '@nestjs/testing'

import { ProductsService } from './products.service'
import { getModelToken } from '@nestjs/sequelize'
import { InferAttributes } from 'sequelize'
import { ProductsModel } from './models/products.model'
import { beforeEach, describe, it, expect, jest } from '@jest/globals'
import { NotFoundError } from '../exceptions/errors'
import { CreateProductDto } from './dtos/product.dto'
type ProductModelType = InferAttributes<ProductsModel>
describe('ProductsService', () => {
  let service: ProductsService
  let model: typeof ProductsModel
  let mockedProducts: ProductModelType
  beforeEach(async () => {
    mockedProducts = {
      id: 1,
      productToken: 'mocked-product-token',
      name: 'Mocked Product',
      price: 10.22,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 0,
    } satisfies ProductModelType

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getModelToken(ProductsModel),
          useValue: {
            findAndCountAll: jest
              .fn()
              .mockImplementation(() =>
                Promise.resolve({ count: 1, rows: [mockedProducts] }),
              ),
            findOne: jest
              .fn()
              .mockImplementation(() => Promise.resolve(mockedProducts)),
            create: jest
              .fn()
              .mockImplementation(() => Promise.resolve(mockedProducts)),
            update: jest.fn().mockImplementation(() => Promise.resolve([1])),
            destroy: jest.fn().mockImplementation(() => Promise.resolve(1)),
          },
        },
      ],
    }).compile()

    service = module.get<ProductsService>(ProductsService)
    model = module.get<typeof ProductsModel>(getModelToken(ProductsModel))
  })

  it('should retrieve list of products with pagination', async () => {
    const result = await service.getProductsWithPagination({
      page: 1,
      limit: 10,
    })
    expect(result).toEqual({ count: 1, rows: [mockedProducts] })
    expect(model.findAndCountAll).toHaveBeenCalledWith({
      offset: 0,
      limit: 10,
      order: ['id'],
    })
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

  it('should throw NotFoundError when product does not exist', async () => {
    jest.spyOn(model, 'findOne').mockImplementation(() => Promise.resolve(null))
    await expect(
      service.getProduct({
        productToken: 'non-existent-token',
      }),
    ).rejects.toThrow(NotFoundError)
  })

  it('should create a new product', async () => {
    const newProduct = {
      productToken: 'new-product-token',
      name: 'New Product',
      priceInCents: 1022,
      stock: 10,
    } satisfies CreateProductDto
    const productToken = await service.createProduct({ product: newProduct })
    expect(productToken).toEqual(mockedProducts.productToken)
    expect(model.create).toHaveBeenCalledWith({
      ...newProduct,
      price: newProduct.priceInCents / 100,
    })
  })

  it('should update a product', async () => {
    const updatedProduct = {
      stock: 15,
    }
    await service.updateProduct({
      productToken: 'mocked-product-token',
      product: updatedProduct,
    })
    expect(model.update).toHaveBeenCalledWith(updatedProduct, {
      where: { productToken: 'mocked-product-token' },
    })
  })

  it('should throw NotFoundError when updating non-existent product', async () => {
    jest.spyOn(model, 'update').mockImplementation(() => Promise.resolve([0]))
    await expect(
      service.updateProduct({
        productToken: 'non-existent-token',
        product: { stock: 15 },
      }),
    ).rejects.toThrow(NotFoundError)
  })

  it('should delete a product', async () => {
    await service.deleteProduct({ productToken: 'mocked-product-token' })
    expect(model.destroy).toHaveBeenCalledWith({
      where: { productToken: 'mocked-product-token' },
    })
  })

  it('should throw NotFoundError when deleting non-existent product', async () => {
    jest.spyOn(model, 'destroy').mockImplementation(() => Promise.resolve(0))
    await expect(
      service.deleteProduct({ productToken: 'non-existent-token' }),
    ).rejects.toThrow(NotFoundError)
  })
})
