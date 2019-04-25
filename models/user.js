import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcrypt';

const MIN_PASSWORD_LENGTH = 7;

export default class User extends Model {
  static init(database) {
    return super.init(
      {
        uuid: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            isEmail: true,
          },
          unique: {
            args: true,
            msg: 'email address already in use',
          },
        },
        nickname: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: {
            args: true,
            msg: 'nickname already in use',
          },
        },
        password: {
          type: Sequelize.VIRTUAL,
          validate: {
            isLongEnough(value) {
              if (value.length < MIN_PASSWORD_LENGTH) {
                throw new Error('Password too short');
              }
            },
          },
        },
        password_confirmation: {
          type: Sequelize.VIRTUAL,
          validate: {
            isEqual(value) {
              if (this.passport !== value) {
                throw new Error("Password don't match");
              }
            },
          },
        },
        password_digest: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
      },
      {
        sequelize: database,
        hooks: {
          async beforeValidate(user, options) {
            if (user.isNewRecord) {
              const SALT_ROUND = 10;
              const hash = await bcrypt.hash(user.password, SALT_ROUND);
              if (hash === null) {
                throw new Error("Can't hash password.");
              }
              user.password_digest = hash;
            }
          },
        },
      },
    );
  }

  async checkPassword(password) {
    return await bcrypt.compare(password, this.password_digest);
  }

  static associate(models) {
    this.belongsToMany(models.Event, {
      through: 'EventsUser',
      as: 'events',
      foreignKey: 'uuid',
    });
  }
}
