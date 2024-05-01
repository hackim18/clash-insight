"use strict";

const { hashPassword } = require("../helpers/bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const users = require("../data/users.json").map((element) => {
      element.password = hashPassword(element.password);
      element.createdAt = element.updatedAt = new Date();
      return element;
    });
    await queryInterface.bulkInsert("Users", users, {});

    const profileImages = require("../data/profileImages.json").map((element) => {
      element.createdAt = element.updatedAt = new Date();
      return element;
    });
    await queryInterface.bulkInsert("ProfileImages", profileImages, {});

    const gameAccounts = require("../data/gameAccounts.json").map((element) => {
      element.createdAt = element.updatedAt = new Date();
      return element;
    });
    await queryInterface.bulkInsert("GameAccounts", gameAccounts, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
    await queryInterface.bulkDelete("GameAccounts", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
    await queryInterface.bulkDelete("ProfileImages", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
