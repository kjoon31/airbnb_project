const express = require('express');
const router = express.Router();
const { Spot } = require('../../db/models')


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

module.exports = router;