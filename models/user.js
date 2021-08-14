'use strict';
const {encryptPwd} = require('../helpers/bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.belongsToMany(models.task, {through: 'models.review'});
      user.hasMany(models.review);
    }
  };
  user.init({
    name: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Insert your name,please!"
        },
      }
    },
    image: {
    type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Upload your photo here!"
        }
      }
    },
    email: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Insert your email address,please!"
        },
        isEmail : {
          msg : "Please fill by an email format, please!"
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Fill the password please, thank you!"
        }
      }
    },
    role: {
      type : DataTypes.STRING,
      defaultValue : "User"
    },
  },
    {
      hooks: {
        beforeBulkUpdate(user){
          user.attributes.password = encryptPwd(user.attributes.password)
        },
        beforeCreate(user){
          user.password = encryptPwd(user.password)
        }
      },
      sequelize,
      modelName: 'user',
    });
    return user;
  };
