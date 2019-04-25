import Sequelize, { Model } from 'sequelize';

export default class Category extends Model {
  static init(database) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize: database,
      },
    );
  }

  static associate(models) {
    this.belongsToMany(models.Event, {
      through: 'EventsCategory',
      as: 'events',
      foreignKey: 'id',
    });
  }
}
