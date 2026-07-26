import { Test, TestingModule } from '@nestjs/testing'
import { HttpAdapterHost } from '@nestjs/core'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { App } from 'supertest/types'
import { AppModule } from './../src/app.module'
import { beforeEach, describe, it, afterEach, expect } from '@jest/globals'
import { HandleExceptionsFilter } from '../src/exceptions'
describe('AppController (e2e)', () => {
  let app: INestApplication<App>

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    const { httpAdapter } = app.get(HttpAdapterHost)
    app.useGlobalFilters(new HandleExceptionsFilter(httpAdapter))
    await app.init()
  })

  describe('Products API - GET /v1/products', () => {
    it('should retrieve paginated products', () => {
      return request(app.getHttpServer())
        .get('/v1/products?page=1&limit=10')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('total')
          expect(res.body).toHaveProperty('data')
          expect(Array.isArray(res.body.data)).toBe(true)
        })
    })

    it('should fail validation when limit is not provided', () => {
      return request(app.getHttpServer()).get('/v1/products?page=1').expect(400)
    })

    it('should fail validation when page is not provided', () => {
      return request(app.getHttpServer())
        .get('/v1/products?limit=1')
        .expect(400)
    })

    it('should fail validation when page is less than 1', () => {
      return request(app.getHttpServer())
        .get('/v1/products?page=0&limit=10')
        .expect(400)
    })

    it('should fail validation when limit is less than 1', () => {
      return request(app.getHttpServer())
        .get('/v1/products?page=1&limit=0')
        .expect(400)
    })
  })

  describe('Products API - POST /v1/products', () => {
    it('should create a new product', () => {
      const newProduct = {
        productToken: 'test-product-token-100',
        name: 'Test Product',
        priceInCents: 9999,
        stock: 50,
      }

      return request(app.getHttpServer())
        .put('/v1/products')
        .send(newProduct)
        .expect(201)
    })

    it('should fail validation when productToken is missing', () => {
      const invalidProduct = {
        name: 'Test Product',
        priceInCents: 9999,
        stock: 50,
      }

      return request(app.getHttpServer())
        .put('/v1/products')
        .send(invalidProduct)
        .expect(400)
    })

    it('should fail validation when name is missing', () => {
      const invalidProduct = {
        productToken: 'test-token-1',
        priceInCents: 9999,
        stock: 50,
      }

      return request(app.getHttpServer())
        .put('/v1/products')
        .send(invalidProduct)
        .expect(400)
    })

    it('should fail validation when priceInCents is missing', () => {
      const invalidProduct = {
        productToken: 'test-token-1',
        name: 'Test Product',
        stock: 50,
      }

      return request(app.getHttpServer())
        .put('/v1/products')
        .send(invalidProduct)
        .expect(400)
    })

    it('should fail validation when stock is missing', () => {
      const invalidProduct = {
        productToken: 'test-token-1',
        name: 'Test Product',
        priceInCents: 9999,
      }

      return request(app.getHttpServer())
        .put('/v1/products')
        .send(invalidProduct)
        .expect(400)
    })

    it('should fail validation when stock is negative', () => {
      const invalidProduct = {
        productToken: 'test-token-1',
        name: 'Test Product',
        priceInCents: 9999,
        stock: -1,
      }

      return request(app.getHttpServer())
        .put('/v1/products')
        .send(invalidProduct)
        .expect(400)
    })
  })

  describe('Products API - GET /v1/products/:productToken', () => {
    let createdProductToken: string

    beforeEach(async () => {
      // Create a product for testing
      const suffix = Date.now().toString()
      createdProductToken = 'test-get-product-' + suffix
      const newProduct = {
        productToken: createdProductToken,
        name: 'Product to Get',
        priceInCents: 5000,
        stock: 20,
      }

      await request(app.getHttpServer()).put('/v1/products').send(newProduct)
    })

    it('should retrieve a product by token', () => {
      console.log('product-token', createdProductToken)
      return request(app.getHttpServer())
        .get(`/v1/products/${createdProductToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('productToken')
          expect(res.body).toHaveProperty('name')
          expect(res.body).toHaveProperty('price')
          expect(res.body).toHaveProperty('stock')
          expect(res.body.productToken).toBe(createdProductToken)
        })
    })

    it('should return 404 when product does not exist', () => {
      return request(app.getHttpServer())
        .get('/v1/products/non-existent-token-' + Date.now().toString())
        .expect(404)
    })

    it('should not include database-only fields in response', () => {
      return request(app.getHttpServer())
        .get(`/v1/products/${createdProductToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).not.toHaveProperty('id')
          expect(res.body).not.toHaveProperty('createdAt')
          expect(res.body).not.toHaveProperty('updatedAt')
          expect(res.body).not.toHaveProperty('version')
        })
    })
  })

  describe('Products API - PATCH /v1/products/:productToken', () => {
    let productTokenToUpdate: string

    beforeEach(async () => {
      // Create a product for testing
      const suffix = Date.now().toString()
      productTokenToUpdate = 'test-get-product-' + suffix
      const newProduct = {
        productToken: productTokenToUpdate,
        name: 'Product to Update',
        priceInCents: 7500,
        stock: 30,
      }

      await request(app.getHttpServer()).put('/v1/products').send(newProduct)
    })

    it('should update a product stock', () => {
      const updateData = {
        stock: 100,
      }

      return request(app.getHttpServer())
        .patch(`/v1/products/${productTokenToUpdate}`)
        .send(updateData)
        .expect(200)
    })

    it('should fail when updating non-existent product', () => {
      const updateData = {
        stock: 50,
      }

      return request(app.getHttpServer())
        .patch('/v1/products/non-existent-token-' + Date.now())
        .send(updateData)
        .expect(404)
    })

    it('should fail validation when stock is negative', () => {
      const updateData = {
        stock: -5,
      }

      return request(app.getHttpServer())
        .patch(`/v1/products/${productTokenToUpdate}`)
        .send(updateData)
        .expect(400)
    })

    it('should allow updating stock to 0', () => {
      const updateData = {
        stock: 0,
      }

      return request(app.getHttpServer())
        .patch(`/v1/products/${productTokenToUpdate}`)
        .send(updateData)
        .expect(200)
    })
  })

  describe('Products API - DELETE /v1/products/:productToken', () => {
    let productTokenToDelete: string

    beforeEach(async () => {
      // Create a product for testing
      const suffix = Date.now().toString()
      productTokenToDelete = 'test-get-product-' + suffix
      const newProduct = {
        productToken: productTokenToDelete,
        name: 'Product to Delete',
        priceInCents: 1000,
        stock: 10,
      }

      await request(app.getHttpServer()).put('/v1/products').send(newProduct)
    })

    it('should delete a product', () => {
      return request(app.getHttpServer())
        .delete(`/v1/products/${productTokenToDelete}`)
        .expect(200)
    })

    it('should return 404 when deleting non-existent product', () => {
      return request(app.getHttpServer())
        .delete('/v1/products/non-existent-token-' + Date.now())
        .expect(404)
    })

    it('should make product unavailable after deletion', async () => {
      // Delete the product
      await request(app.getHttpServer())
        .delete(`/v1/products/${productTokenToDelete}`)
        .expect(200)

      // Try to get the deleted product
      return request(app.getHttpServer())
        .get(`/v1/products/${productTokenToDelete}`)
        .expect(404)
    })
  })

  afterEach(async () => {
    // Truncate tables for test isolation
    console.log('Truncating tables for test isolation...')
    /*  try {
      execSync(
        `mysql -h 127.0.1.1 -P 3306 -uroot -proot ecommerce-test -e "SET FOREIGN_KEY_CHECKS = 0; TRUNCATE TABLE products; SET FOREIGN_KEY_CHECKS = 1;"`,
        { stdio: 'pipe' },
      )
    } catch (error) {
      console.error('Warning: Failed to truncate tables:', error)
      // Don't throw, continue with teardown
    } */

    await app.close()
  })
})
