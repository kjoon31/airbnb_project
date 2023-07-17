const express = require('express');
const router = express.Router();
const { Spot, Review, SpotImage } = require('../../db/models')


router.post('/', async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body;
  const user = req.user;
  const spot = await Spot.create({
    ownerId: user.id,
    address,
    city, 
    state, 
    country, 
    lat, 
    lng, 
    name, 
    description, 
    price,
  })
  return res.json({
    id: spot.id,
    ownerId: spot.ownerId,
    address,
    city, 
    state, 
    country, 
    lat, 
    lng, 
    name, 
    description, 
    price,
    createdAt: spot.createdAt,
    updatedAt: spot.updatedAt
  })
})

router.get('/', async (req,res) => {
  // const user = req.user
  const spot = await Spot.findAll({
    where: {
      // id,
      // ownerId: user.id,
      // address,
      // city, 
      // state, 
      // country, 
      // lat, 
      // lng, 
      // name, 
      // description, 
      // price,
      // createdAt: user.createdAt,
      // updatedAt: user.updatedAt
      // previewImage,
      // avgRating
    }
  })
  return res.json(spot)
})

router.post("/:id/reviews", async (req, res) => {
  const user = req.user;
  const { review, stars } = req.body;

  const spot = await Spot.findByPk(req.params.id);
  if (spot === null) {
    return res.status(404).json("Spot does not exist!");
  }

  const reviews = await Review.findAll({
    where: {
      userId: user.id,
      spotId: spot.id, 
    }
  })

  if (reviews.length > 0) {
    return res.status(403).json("User already has review")
  }

  const createdReview = await Review.create({
    spotId: spot.id,
    userId: user.id,
    review,
    stars
  });

  return res.json({
    id: createdReview.id,
    userId: createdReview.userId,
    spotId: createdReview.spotId,
    review: createdReview.review,
    stars: createdReview.stars,
    createdAt: createdReview.createdAt,
    updatedAt: createdReview.updatedAt
  })
})

router.get("/:id/reviews", async (req, res) => {
  const user = req.user;
  const spot = await Spot.findByPk(req.params.id);
  if (spot === null) {
    return res.status(404).json("Spot does not exist!");
  }

  const reviews = await Review.findAll({
    where: {
      spotId: spot.id,
      userId: user.id
    }
  }) 
  return res.json(reviews)
})

router.get('/', async (req,res) => {
    const spot = await Spot.findAll()
    return res.json(spot)
  })

router.post("/:id/images", async (req, res) => {
  const user = req.user;
  const { url, preview } = req.body;
  if (!user) {
    return res.status(401).json("User not authenticated");
  }

  let spot = await Spot.findByPk(req.params.id);

  if (spot === null) {
    return res.status(404).json("Spot not found!");
  }

  spot = await Spot.findOne({
    where: {
      id: req.params.id,
      ownerId: user.id
    }
  });

  if (spot === null) {
    return res.status(500).json("Spot does not exist or user not owner of spot!");
  }

  const spotImage = await SpotImage.create({
    spotId: spot.id,
    url,
    preview
  }) 

  return res.json(spotImage)
})

module.exports = router;