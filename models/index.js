import Sequelize, { Op } from 'sequelize';
import User from './user';
import Event from './event.js';
import Category from './category.js';

const dotenv = require('dotenv');

dotenv.config();
console.log(process.env.DATABASE_URL);
export const db = new Sequelize(process.env.DATABASE_URL, {
  operatorsAliases: Op,
  define: {
    underscored: true,
  },
});

// FIXME - dynamic import model
export const models = {
  User: User.init(db),
  Event: Event.init(db),
  Category: Category.init(db),
};
console.log(models);
Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models));
