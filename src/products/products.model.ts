import { Column, Model, Table } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'
@Table({
  version: true,
})
export class Products extends Model<Products, Exclude<Products, 'id'>> {
  @Column({ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true })
  id: number = 0

  @Column({ type: DataTypes.STRING, unique: true })
  productToken: string = ''

  @Column({ type: DataTypes.STRING })
  name: string = ''

  @Column({ type: DataTypes.DECIMAL(10, 2) })
  price: number = 0.0

  @Column({ type: DataTypes.INTEGER })
  stock: number = 0
}
