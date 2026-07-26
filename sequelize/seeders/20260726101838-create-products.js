'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const baseDate = new Date()
    baseDate.setDate(baseDate.getDate() - 21)
    const daySpan = 20 / 19

    await queryInterface.bulkInsert('products', [
      {
        productToken: 'product-1-token',
        name: 'Product 1',
        price: 10.99,
        stock: 100,
        createdAt: new Date(baseDate),
        updatedAt: new Date(baseDate),
      },
      {
        productToken: 'product-2-token',
        name: 'Product 2',
        price: 19.99,
        stock: 90,
        createdAt: new Date(baseDate.getTime() + Math.round(daySpan * 24 * 60 * 60 * 1000)),
        updatedAt: new Date(baseDate.getTime() + Math.round(daySpan * 24 * 60 * 60 * 1000)),
      },
      {
        productToken: 'product-3-token',
        name: 'Product 3',
        price: 5.99,
        stock: 80,
        createdAt: new Date(baseDate.getTime() + Math.round(daySpan * 2 * 24 * 60 * 60 * 1000)),
        updatedAt: new Date(baseDate.getTime() + Math.round(daySpan * 2 * 24 * 60 * 60 * 1000)),
      },
      {
        productToken: 'product-4-token',
        name: 'Product 4',
        price: 29.99,
        stock: 70,
        createdAt: new Date(baseDate.getTime() + Math.round(daySpan * 3 * 24 * 60 * 60 * 1000)),
        updatedAt: new Date(baseDate.getTime() + Math.round(daySpan * 3 * 24 * 60 * 60 * 1000)),
      },
      {
        productToken: 'product-5-token',
        name: 'Product 5',
        price: 15.99,
        stock: 60,
        createdAt: new Date(baseDate.getTime() + Math.round(daySpan * 4 * 24 * 60 * 60 * 1000)),
        updatedAt: new Date(baseDate.getTime() + Math.round(daySpan * 4 * 24 * 60 * 60 * 1000)),
      },
      {
        productToken: 'product-6-token',
        name: 'Product 6',
        price: 8.99,
        stock: 50,
        createdAt: new Date(baseDate.getTime() + Math.round(daySpan * 5 * 24 * 60 * 60 * 1000)),
        updatedAt: new Date(baseDate.getTime() + Math.round(daySpan * 5 * 24 * 60 * 60 * 1000)),
      },
      {
        productToken: 'product-7-token',
        name: 'Product 7',
        price: 12.99,
        stock: 40,
        createdAt: new Date(baseDate.getTime() + Math.round(daySpan * 6 * 24 * 60 * 60 * 1000)),
        updatedAt: new Date(baseDate.getTime() + Math.round(daySpan * 6 * 24 * 60 * 60 * 1000)),
      },
      {
        productToken: 'product-8-token',
        name: 'Product 8',
        price: 22.99,
        stock: 30,
        createdAt: new Date(baseDate.getTime() + Math.round(daySpan * 7 * 24 * 60 * 60 * 1000)),
        updatedAt: new Date(baseDate.getTime() + Math.round(daySpan * 7 * 24 * 60 * 60 * 1000)),
      },
      {
        productToken: 'product-9-token',
        name: 'Product 9',
        price: 6.99,
        stock: 20,
        createdAt: new Date(baseDate.getTime() + Math.round(daySpan * 8 * 24 * 60 * 60 * 1000)),
        updatedAt: new Date(baseDate.getTime() + Math.round(daySpan * 8 * 24 * 60 * 60 * 1000)),
      },
      {
        productToken: 'product-10-token',
        name: 'Product 10',
        price: 17.99,
        stock: 10,
        createdAt: new Date(baseDate.getTime() + Math.round(daySpan * 9 * 24 * 60 * 60 * 1000)),
        updatedAt: new Date(baseDate.getTime() + Math.round(daySpan * 9 * 24 * 60 * 60 * 1000)),
      },
      {
        productToken: 'product-11-token',
        name: 'Product 11',
        price: 11.99,
        stock: 95,
        createdAt: new Date(baseDate.getTime() + Math.round(daySpan * 10 * 24 * 60 * 60 * 1000)),
        updatedAt: new Date(baseDate.getTime() + Math.round(daySpan * 10 * 24 * 60 * 60 * 1000)),
      },
      {
        productToken: 'product-12-token',
        name: 'Product 12',
        price: 24.99,
        stock: 85,
        createdAt: new Date(baseDate.getTime() + Math.round(daySpan * 11 * 24 * 60 * 60 * 1000)),
        updatedAt: new Date(baseDate.getTime() + Math.round(daySpan * 11 * 24 * 60 * 60 * 1000)),
      },
      {
        productToken: 'product-13-token',
        name: 'Product 13',
        price: 7.99,
        stock: 75,
        createdAt: new Date(baseDate.getTime() + Math.round(daySpan * 12 * 24 * 60 * 60 * 1000)),
        updatedAt: new Date(baseDate.getTime() + Math.round(daySpan * 12 * 24 * 60 * 60 * 1000)),
      },
      {
        productToken: 'product-14-token',
        name: 'Product 14',
        price: 14.99,
        stock: 65,
        createdAt: new Date(baseDate.getTime() + Math.round(daySpan * 13 * 24 * 60 * 60 * 1000)),
        updatedAt: new Date(baseDate.getTime() + Math.round(daySpan * 13 * 24 * 60 * 60 * 1000)),
      },
      {
        productToken: 'product-15-token',
        name: 'Product 15',
        price: 18.99,
        stock: 55,
        createdAt: new Date(baseDate.getTime() + Math.round(daySpan * 14 * 24 * 60 * 60 * 1000)),
        updatedAt: new Date(baseDate.getTime() + Math.round(daySpan * 14 * 24 * 60 * 60 * 1000)),
      },
      {
        productToken: 'product-16-token',
        name: 'Product 16',
        price: 9.99,
        stock: 45,
        createdAt: new Date(baseDate.getTime() + Math.round(daySpan * 15 * 24 * 60 * 60 * 1000)),
        updatedAt: new Date(baseDate.getTime() + Math.round(daySpan * 15 * 24 * 60 * 60 * 1000)),
      },
      {
        productToken: 'product-17-token',
        name: 'Product 17',
        price: 13.99,
        stock: 35,
        createdAt: new Date(baseDate.getTime() + Math.round(daySpan * 16 * 24 * 60 * 60 * 1000)),
        updatedAt: new Date(baseDate.getTime() + Math.round(daySpan * 16 * 24 * 60 * 60 * 1000)),
      },
      {
        productToken: 'product-18-token',
        name: 'Product 18',
        price: 21.99,
        stock: 25,
        createdAt: new Date(baseDate.getTime() + Math.round(daySpan * 17 * 24 * 60 * 60 * 1000)),
        updatedAt: new Date(baseDate.getTime() + Math.round(daySpan * 17 * 24 * 60 * 60 * 1000)),
      },
      {
        productToken: 'product-19-token',
        name: 'Product 19',
        price: 4.99,
        stock: 15,
        createdAt: new Date(baseDate.getTime() + Math.round(daySpan * 18 * 24 * 60 * 60 * 1000)),
        updatedAt: new Date(baseDate.getTime() + Math.round(daySpan * 18 * 24 * 60 * 60 * 1000)),
      },
      {
        productToken: 'product-20-token',
        name: 'Product 20',
        price: 16.99,
        stock: 5,
        createdAt: new Date(baseDate.getTime() + Math.round(daySpan * 19 * 24 * 60 * 60 * 1000)),
        updatedAt: new Date(baseDate.getTime() + Math.round(daySpan * 19 * 24 * 60 * 60 * 1000)),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('products', null, {})
  }
};
