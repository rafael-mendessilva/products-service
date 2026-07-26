import { Column, Model, Table } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'
@Table({
  version: true,
  tableName: 'products',
})
export class ProductsModel extends Model {
  @Column({ type: DataTypes.STRING, unique: true })
  declare productToken: string

  @Column({ type: DataTypes.STRING })
  declare name: string

  @Column({ type: DataTypes.DECIMAL(undefined, 2) })
  declare price: number

  @Column({ type: DataTypes.INTEGER })
  declare stock: number
}
