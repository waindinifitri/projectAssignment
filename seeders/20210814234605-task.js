'use strict';
const fs = require('fs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const parseData = JSON.parse(fs.readFileSync('./datatasks.json'));
   const tasksData = [];
   
   parseData.forEach(data => {  
     const { title, picture, status, priority, product_manager, engineers, typeId } = data;
     moviesData.push({
      title,
      picture,
      status,
      priority,
      product_manager,
      engineers,
      typeId,
      createdAt : new Date(),
      updatedAt : new Date()
     })
   })
   await queryInterface.bulkInsert('tasks', tasksData, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('tasks', null, {});
  }
};
