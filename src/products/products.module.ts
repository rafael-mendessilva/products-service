import { Module } from '@nestjs/common'
import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { ProductsModel } from './models/products.model'

@Module({
  imports: [SequelizeModule.forFeature([ProductsModel])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
