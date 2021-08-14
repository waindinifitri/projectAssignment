'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      type.hasMany(models.task)
    }
  };
  type.init({
    typeName: {
        type: DataTypes.STRING,
        validate : {
          notEmpty :{
            msg : "Please input the duration estimation, please."
          }
        }
      },
    duration: {
      type: DataTypes.STRING,
      validate : {
        notEmpty :{
          msg : "Please input the duration estimation, please."
        }
      }
    },
    blockers: {
        type: DataTypes.TEXT,
        validate : {
          notEmpty :{
            msg : "Please input any potential blockers, please."
          }
        }
    },
    actual_start: {
        type: DataTypes.STRING,
        validate : {
          notEmpty :{
            msg : "Please input the actual time when you start this task."
          }
        }
    },
    actual_finish: {
        type: DataTypes.STRING,
        validate : {
          notEmpty :{
            msg : "Please input the actual time for this task to be finished ."
          }
        }
    },
    source: {
        type: DataTypes.TEXT,
        validate : {
          notEmpty :{
            msg : "Would you please fill all of your source when you doing the task? Thank you!"
          }
        }
      }, 
  }, {
    sequelize,
    modelName: 'type',
  });
  return type;
};
