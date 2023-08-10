'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up (queryInterface, Sequelize) {
//     await queryInterface.addColumn(options, 'firstName', { type: DataTypes.STRING(30)});
//     await queryInterface.addColumn(options, 'lastName', { type: DataTypes.STRING(30)});
//   },

//   async down (queryInterface, Sequelize) {
//     await queryInterface.removeColumn(options, 'firstname')
//   }
// };
// options.tableName = "Spots";
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.addColumn(options, 'UserId', {
    //   type: DataTypes.INTEGER
    // })
    await queryInterface.createTable('Spots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ownerId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id"
        }
      },
      address: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      lat: {
        type: Sequelize.INTEGER
      },
      lng: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        type: Sequelize.STRING
      },
      updatedAt: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options);

  },
  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    await queryInterface.dropTable(options);
  }
};