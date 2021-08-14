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
   const parseData = JSON.parse(fs.readFileSync('./datatypes.json'));
   const typesData = [];
   
   parseData.forEach(data => {  
     const { typName, duration, blockers, actual_start, actual_finish, source } = data;
     typesData.push({
      typeName,
      duration,
      blockers,
      actual_start,
      actual_finish,
      source,
      createdAt : new Date(),
      updatedAt : new Date()
     })
   })
   await queryInterface.bulkInsert('types', typesData, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('types', null, {});
  }
};
