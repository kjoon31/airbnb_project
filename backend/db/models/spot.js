'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // parent
      Spot.hasMany(models.Booking)
      Spot.hasMany(models.Review)
      Spot.hasMany(models.SpotImage)
      // child
      models.Booking.belongsTo(Spot)
      models.Review.belongsTo(Spot)
      models.SpotImage.belongsTo(Spot)
    }
  }
  Spot.init({
    // id: DataTypes.INTEGER,
    ownerId: DataTypes.INTEGER,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lat: DataTypes.INTEGER,
    lng: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    createdAt: DataTypes.STRING,
    updatedAt: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};