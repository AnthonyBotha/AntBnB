'use strict';

const { ReviewImage } = require("../models");
const bcrypt = require("bcryptjs");
const reviewimage = require("../models/reviewimage");


let options = {};
options.tableName = "ReviewImages";
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
        await ReviewImage.bulkCreate([
          {
            id: 1,
            url: "www.reviewimageurlone",
            reviewId: 1
          },
          {
            id: 2,
            url: "www.reviewimageurltwo",
            reviewId: 2
          },
          {
            id: 3,
            url: "www.reviewimageurlthree",
            reviewId: 3
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
      options.tableName = "ReviewImages"
      await queryInterface.bulkDelete(options, {
        id: { [Op.in]: [1, 2, 3] }
      },{});
  }
};
