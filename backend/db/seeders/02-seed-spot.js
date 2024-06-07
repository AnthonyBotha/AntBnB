'use strict';

const { Spot } = require("../models");
const bcrypt = require("bcryptjs");


let options = {};
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
   await Spot.bulkCreate([
    {
      id: 1,
      ownerId: 1,
      address: "123 Street Ave",
      city: "Los Angeles",
      state: "California",
      country: "United States",
      lat: 23.432,
      lng: 434.2345,
      name: "Anthony's Pad",
      description: "Great place!",
      price: 234.43
    },
    {
      id: 2,
      ownerId: 2,
      address: "52 Long Ave",
      city: "Salt Lake City",
      state: "Utah",
      country: "United States",
      lat: 235.22,
      lng: 2345.213,
      name: "Snow Paradise",
      description: "Great destination for a ski trip",
      price: 500.10
    },
    {
      id: 3,
      ownerId: 3,
      address: "03 Washington Ave",
      city: "Boulder",
      state: "Colorado",
      country: "United States",
      lat: 345.21,
      lng: 9021.23,
      name: "Mountain Cabin",
      description: "Several hiking trails to choose from",
      price: 435.23
    }
  ],{validate: true});
  
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = "Spots";
    await queryInterface.bulkDelete(options,{
      id: { [Op.in]: [1, 2, 3] }
    },{});
  }
};
