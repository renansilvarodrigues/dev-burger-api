import Sequelize, { DataTypes, Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    return Model.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        admin: Sequelize.BOOLEAN,
      },
      { sequelize, tableName: 'users', underscored: true, timestamps: true },
    );
  }
}

export default User;
