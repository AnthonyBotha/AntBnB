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
            url: "https://res.cloudinary.com/dmg8yuivs/image/upload/v1721698727/Preview_Image_1_h6kwv6.jpg",
            preview: true,
            spotId: 2
          },
          {
            url: "https://res.cloudinary.com/dmg8yuivs/image/upload/v1721698719/Preview_Image_3_clmmae.jpg",
            preview: false,
            spotId: 1
          },
          {
            url: "https://res.cloudinary.com/dmg8yuivs/image/upload/v1721698719/Preview_Image_2_kzurmw.jpg",
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
      url: { [Op.in]: ["https://res.cloudinary.com/dmg8yuivs/image/upload/v1721698727/Preview_Image_1_h6kwv6.jpg",
         "https://res.cloudinary.com/dmg8yuivs/image/upload/v1721698719/Preview_Image_3_clmmae.jpg",
          "https://res.cloudinary.com/dmg8yuivs/image/upload/v1721698719/Preview_Image_2_kzurmw.jpg"] }
    },{});
  }
};
