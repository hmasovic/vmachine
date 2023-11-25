import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute } from 'sequelize';

import sequelize from '..';
import { Users } from './Users';

export class Sessions extends Model<InferAttributes<Sessions>, InferCreationAttributes<Sessions>> {
  declare id: CreationOptional<number>;
  declare userId: ForeignKey<Users['id']>;
  declare isActive: boolean;
  declare expireTimestamp: Date;
  declare token: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare user?: NonAttribute<Users>;
}

Sessions.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'Users',
        },
        key: 'id',
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    expireTimestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
  }
);

Sessions.belongsTo(Users, {
  targetKey: 'id',
  foreignKey: 'userId',
  as: 'user',
});

Users.hasMany(Sessions, {
  sourceKey: 'id',
  foreignKey: 'userId',
  as: 'sessions',
});
