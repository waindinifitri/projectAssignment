'use strict';
const sequelizePaginate = require('sequelize-paginate')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      task.belongsTo(models.type)
      task.belongsToMany(models.user, {through : 'models.review'})
      task.hasMany(models.review)
    }
  };
  task.init({
    title: {
      type : DataTypes.STRING,
      validate :{
        notEmpty: {
          msg : "Please input the title.",
        }
      }
    },
    picture:{
      type : DataTypes.STRING,
      validate :{
        notEmpty: {
          msg : "You can input the wireframe here."
        }
      }
    },
    status: {
      type: DataTypes.INTEGER,
      validate : { 
        isNumeric: true,
        notEmpty: {
          msg : "Please input the year.",
        }
      }
    },
    priority: {
      type : DataTypes.TEXT,
      validate : {
        notEmpty : {
          msg : "Please input the synopsis here."
        }
      }
    },
    product_manager: {
      type: DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Please input the characters here."
        }
      }
    },
    engineers: {
        type : DataTypes.TEXT,
        validate : {
          notEmpty : {
            msg : "Please input the synopsis here."
          }
        }
    },
    product: {
        type : DataTypes.TEXT,
        validate : {
          notEmpty : {
            msg : "Please input the synopsis here."
          }
        }
      },
    typeId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'task',
  });
  sequelizePaginate.paginate(task);
  return task;
};  
