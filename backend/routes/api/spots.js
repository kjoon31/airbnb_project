const express = require('express');
const router = express.Router();
const { Spot } = require('../../db/models')


router.post('/', async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body;
  // fetch(ownerId)
  console.log(req.user)
  // const { ownerId } = req.body
  const spot = await Spot.create({
    // ownerId,
    address,
    city, 
    state, 
    country, 
    lat, 
    lng, 
    name, 
    description, 
    price
  })
  // return res.json({
  //   id: spot.id,
  //   ownerId: null, // the authenticated user's id
  //   address: spot.address,
  //   // city:, 
  //   // state, 
  //   // country, 
  //   // lat, 
  //   // lng, 
  //   // name, 
  //   // description, 
  //   // price
  // })
})


module.exports = router;