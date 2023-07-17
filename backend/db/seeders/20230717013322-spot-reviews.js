'use strict';

const { User, Spot, Review } = require('../models');

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

    const user = await User.findOne();
    await Spot.bulkCreate([
      {
        ownerId: user.id,
        address: "1 Hollis Ct",
        city: "Loma Linda",
        state: "CA",
        country: "USA",
        lat: 36,
        lng: -120,
        name: "Cozy Rental",
        description: "my home",
        price: 100
      }
    ], { validate: true });
    const spot = await Spot.findOne();
    await Review.bulkCreate([
      {
        spotId: spot.id,
        userId: user.id,
        review: "Great place!",
        stars: 5
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
