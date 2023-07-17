'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // parent
      Review.hasMany(models.ReviewImage)

      // child
      models.ReviewImage.belongsTo(Review)
    }
  }
  Review.init({
    spotId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    review: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 1000]
      },
    },
    stars: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 5,
      }
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};