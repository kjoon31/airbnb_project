// Delete an existing image for a Review.

//  An authenticated user is required for a successful response
//  Only the owner of the review is authorized to delete
//  Image record is removed from the database after request
//  Success response includes a message indicating a successful deletion
//  Error response with status 404 is given when a review image does not exist with the provided id


const express = require('express');
const router = express.Router();
const { ReviewImage, Review } = require('../../db/models');

router.delete("/:id/image/:imageId", async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json("User not authenticated");
  }

  let review = await Review.findByPk(req.params.id);

  if (review === null) {
    return res.status(404).json("Review not found!");
  }

  if (review.userId !== user.id) {
    return res.status(403).json("User is not the owner of the Review");
  }

  await ReviewImage.destroy({
    where: {
      id: req.params.imageId,
      reviewId: req.params.id
    }
  });

  return res.json("Image successfully deleted");
});

module.exports = router;