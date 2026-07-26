import { Test, TestingModule } from '@nestjs/testing'
import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'

import { InferAttributes } from 'sequelize'
import { ProductsModel } from './models/products.model'
import { describe, expect, it, beforeEach, jest } from '@jest/globals'
import { GetProductsResponse, GetProductResponse } from './responses'
import { ProductResponse } from './responses'

type ProductModelType = InferAttributes<ProductsModel>
describe('ProductsController', () => {
  let controller: ProductsController
  let service: ProductsService
  let mockedProducts: ProductModelType[]
  beforeEach(async () => {
    mockedProducts = [
      {
        id: 1,
        productToken: 'mocked-product-token-1',
        name: 'Mocked Product 1',
        price: 10.22,
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
        version: 0,
      },
      {
        id: 2,
        productToken: 'mocked-product-token-2',
        name: 'Mocked Product 2',
        price: 20.5,
        stock: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
        version: 0,
      },
    ] satisfies ProductModelType[]

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            getProductsWithPagination: jest.fn(),
            getProduct: jest
              .fn()
              .mockImplementation(() => Promise.resolve(mockedProducts[0])),
          },
        },
      ],
    }).compile()

    controller = module.get<ProductsController>(ProductsController)
    service = module.get<ProductsService>(ProductsService)
  })

  describe('getProductsWithPagination', () => {
    it('should retrieve first page of products with pagination and transform response', async () => {
      jest.spyOn(service, 'getProductsWithPagination').mockResolvedValueOnce({
        rows: [mockedProducts[0], mockedProducts[1]],
        count: 2,
      } as any)

      const result = await controller.getProductsWithPagination({
        page: 1,
        limit: 10,
      })

      expect(result).toBeInstanceOf(GetProductsResponse)
      expect(result.total).toBe(2)
      expect(result.data).toHaveLength(2)
      expect(result.data[0]).toBeInstanceOf(ProductResponse)
      expect(result.data[1]).toBeInstanceOf(ProductResponse)

      // Verify response excludes sensitive fields from db model
      expect(result.data[0]).not.toHaveProperty('id')
      expect(result.data[0]).not.toHaveProperty('createdAt')
      expect(result.data[0]).not.toHaveProperty('updatedAt')
      expect(result.data[0]).not.toHaveProperty('version')

      // Verify response includes expected fields
      expect(result.data[0].productToken).toBe('mocked-product-token-1')
      expect(result.data[0].name).toBe('Mocked Product 1')
      expect(result.data[0].price).toBe(10.22)
      expect(result.data[0].stock).toBe(10)

      expect(service.getProductsWithPagination).toHaveBeenCalledWith({
        page: 1,
        limit: 10,
      })
    })

    it('should retrieve second page of products with different pagination params', async () => {
      jest.spyOn(service, 'getProductsWithPagination').mockResolvedValueOnce({
        rows: [mockedProducts[1]],
        count: 2,
      } as any)

      const result = await controller.getProductsWithPagination({
        page: 2,
        limit: 1,
      })

      expect(result).toBeInstanceOf(GetProductsResponse)
      expect(result.total).toBe(2)
      expect(result.data).toHaveLength(1)
      expect(result.data[0].productToken).toBe('mocked-product-token-2')

      expect(service.getProductsWithPagination).toHaveBeenCalledWith({
        page: 2,
        limit: 1,
      })
    })

    it('should return empty data when no products on requested page', async () => {
      jest.spyOn(service, 'getProductsWithPagination').mockResolvedValueOnce({
        rows: [],
        count: 2,
      } as any)

      const result = await controller.getProductsWithPagination({
        page: 3,
        limit: 10,
      })

      expect(result).toBeInstanceOf(GetProductsResponse)
      expect(result.total).toBe(2)
      expect(result.data).toHaveLength(0)

      expect(service.getProductsWithPagination).toHaveBeenCalledWith({
        page: 3,
        limit: 10,
      })
    })
  })

  describe('getProduct', () => {
    it('should retrieve a product by token and transform response', async () => {
      const result = await controller.getProduct({
        productToken: 'mocked-product-token-1',
      })

      expect(result).toBeInstanceOf(GetProductResponse)
      expect(result.productToken).toBe('mocked-product-token-1')

      // Verify response excludes sensitive fields from db model
      expect(result).not.toHaveProperty('id')
      expect(result).not.toHaveProperty('createdAt')
      expect(result).not.toHaveProperty('updatedAt')
      expect(result).not.toHaveProperty('version')

      expect(service.getProduct).toHaveBeenCalledWith({
        productToken: 'mocked-product-token-1',
      })
    })
  })
})
