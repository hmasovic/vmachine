import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute } from 'sequelize';

import sequelize from '..';
import { Users } from './Users';

export class Products extends Model<InferAttributes<Products>, InferCreationAttributes<Products>> {
  declare id: CreationOptional<number>;
  declare amountAvailable: number;
  declare cost: number;
  declare productName: string;
  declare sellerId: ForeignKey<Users['id']>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare seller?: NonAttribute<Users>;
}

Products.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    amountAvailable: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cost: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sellerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'Users',
        },
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    indexes: [],
  }
);

Products.belongsTo(Users, {
  targetKey: 'id',
  foreignKey: 'sellerId',
  as: 'seller',
});

Users.hasMany(Products, {
  sourceKey: 'id',
  foreignKey: 'sellerId',
  as: 'products',
});
