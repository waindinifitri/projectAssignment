'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      review.belongsTo(models.user)
      review.belongsTo(models.task)
    }
  };
  review.init({
    comment: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "What is the detail type of this task, please?"
        }
      }
    },
    performance: {
      type : DataTypes.INTEGER,
      validate : {
       min: 0,
       max: 10,
        notEmpty : {
          msg : "Kindly rate this performance, Thanks!"
        }
      }
    },
    suggestion: {
        type : DataTypes.STRING,
        validate : {
          notEmpty : {
            msg : "Would you please give any suggestion? Thank you!"
          }
        }
      }, 
    userId: DataTypes.INTEGER,
    taskId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'review',
  });
  return review;
};
