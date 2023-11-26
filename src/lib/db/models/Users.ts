import { Association, CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute } from 'sequelize';

import { UserRole } from '../interfaces';

import sequelize from '..';
import { Products } from './Products';
import { Sessions } from './Sessions';

export class Users extends Model<InferAttributes<Users>, InferCreationAttributes<Users>> {
  declare id: CreationOptional<number>;
  declare username: string;
  declare password: string;
  declare deposit: number;
  declare role: UserRole;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare sessions?: NonAttribute<Sessions[]>;
  declare products?: NonAttribute<Products[]>;

  declare static associations: {
    sessions: Association<Users, Sessions>;
    products: Association<Users, Products>;
  };
}

Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deposit: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    role: {
      type: DataTypes.ENUM,
      values: Object.values(UserRole),
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    indexes: [],
  }
);
