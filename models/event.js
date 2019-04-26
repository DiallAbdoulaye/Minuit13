import Sequelize, { Model } from 'sequelize';

export default class Event extends Model {
  static init(database) {
    return super.init(
      {
        idEvent: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        deadline: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      {
        sequelize: database,
      },
    );
  }

  static associate(models) {
    this.belongsToMany(models.User, {
      through: 'EventsUser',
      as: 'users',
      foreignKey: 'id',
    });
    this.belongsToMany(models.Category, {
      through: 'EventsCategory',
      as: 'category',
      foreignKey: 'id',
    });
  }
}
