'use strict';
const { SpotImage } = require("../models");
const bcrypt = require("bcryptjs");


let options = {};
options.tableName = "SpotImages";
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in the options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
        await SpotImage.bulkCreate([
          {
            id: 1,
            url: "www.spotimageurlone",
            preview: true,
            spotId: 2
          },
          {
            id: 2,
            url: "www.spotimageurltwo",
            preview: false,
            spotId: 1
          },
          {
            id: 3,
            url: "www.spotimageurlthree",
            preview: true,
            spotId: 3
          }
        ],{validate:true})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = "SpotImages";
    await queryInterface.bulkDelete(options,{
      id: { [Op.in]: [1, 2, 3] }
    },{});
  }
};
