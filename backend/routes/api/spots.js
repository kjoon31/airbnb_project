const express = require('express');
const router = express.Router();
const { User, Spot } = require('../../db/models')


router.post('/', async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body;
  // const { id, ownerId, createdAt, updatedAt } = a;
  // const user = await User.create({
  //   id,
  //   createdAt,
  //   updatedAt
  // })
  // console.log(user)
  const user = req.user;
  // console.log(user)
  const spot = await Spot.create({
    // id,
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
    // createdAt,
    // updatedAt
  })
  // console.log(spot)
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


module.exports = router;