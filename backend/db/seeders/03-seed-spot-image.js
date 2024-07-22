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
            url: "https://drive.google.com/file/d/1cSvTPfIhjPAANM9rQyDMs1mig9-IQbMn/view?usp=drive_link",
            preview: true,
            spotId: 2
          },
          {
            url: "https://drive.google.com/file/d/17306OficXpdmaEPl7EVw3eDirUPOK_ya/view?usp=drive_link",
            preview: false,
            spotId: 1
          },
          {
            url: "https://drive.google.com/file/d/1TWvRnJcevpSbr251jDpfxC4L9xLWtDnX/view?usp=drive_link",
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
      url: { [Op.in]: ["www.spotimageurlone", "www.spotimageurltwo", "www.spotimageurlthree"] }
    },{});
  }
};
