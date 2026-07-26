import { Column, Model, Table } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'
@Table({
  version: true,
  tableName: 'products',
})
export class ProductsModel extends Model {
  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number

  @Column({ type: DataTypes.STRING, unique: true })
  declare productToken: string

  @Column({ type: DataTypes.STRING })
  declare name: string

  @Column({ type: DataTypes.DECIMAL(undefined, 2) })
  declare price: number

  @Column({ type: DataTypes.INTEGER })
  declare stock: number

  @Column({
    type: DataTypes.DATE,
    allowNull: false,
  })
  declare createdAt: Date

  @Column({
    type: DataTypes.DATE,
    allowNull: false,
  })
  declare updatedAt: Date

  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  declare version: number
}
