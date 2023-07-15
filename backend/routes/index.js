// backend/routes/index.js
const express = require('express');
const router = express.Router();
// backend/routes/index.js
// ...
const apiRouter = require('./api');

let bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);



const { User, Spot } = require('../db/models') 

router.get('/hello/world', function(req, res) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send('Hello World!');
});

// Add a XSRF-TOKEN cookie


// router.post('/api/users', async ( req, res ) => {
//   const { username, email, password } = req.body;
//   const user = await User.create({
//     username,
//     email,
//     hashedPassword: bcrypt.hashSync(password, salt)
//   })
//   // console.log(user)

//   return res.json({
//     id: user.id,
//     firstName: null,
//     lastName: null,
//     email: user.email
//   })
//   // res.status(500)
//   /*
//   Successful response includes newly created id, firstName, lastName, and email
//   Error response with status 500 is given when the specified email or username already exists
//   Error response with status 400 is given when body validations for the email, firstName, or lastName are violated
//   */
// })


router.post('/api/session', async (req, res) => {

})

router.get('/api/session', async (req, res) => {

})

router.get('/api/spots', async (req, res) => {

})

router.post('/api/spots', async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body;
  // fetch(ownerId)
  const { ownerId } = req.body
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
  return res.json({
    id: spot.id,
    ownerId: null, // the authenticated user's id
    address: spot.address,
    // city:, 
    // state, 
    // country, 
    // lat, 
    // lng, 
    // name, 
    // description, 
    // price
  })
})

router.post('/api/spots/:spotId/reviews', async (req, res) => {

})
router.post('/api/spots/:spotId/images', async(req, res) => {

})

router.get('/api/spots/current', async (req, res) => {

})

router.get('/api/spots/:spotId', async (req, res) => {

})

router.put('/api/spots/:spotId', async (req, res) => {

})
  
router.post('/api/spots/:spotId/reviews', async (req, res) => {

})

router.post('/api/reviews/:reviewId/images', async (req, res) => {

})

router.get('/api/reviews/current', async (req, res) => {

})

router.get('/api/spots/:spotId/reviews', async (req, res) => {

})

router.put('/api/reviews/:reviewId', async (req, res) => {

})

router.post('/api/spots/:spotId/bookings', async (req, res) => {

})

router.get('/api/bookings/current', async (req, res) => {

})

router.put('/api/bookings/:bookingId', async (req, res) => {

})

router.delete('/api/spots-images/:id', async (req, res) => {

})
router.delete('/api/review-images/:id', async (req, res) => {

})

router.use('/api', apiRouter);
// ...
module.exports = router;