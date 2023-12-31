// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const bookingsRouter = require("./bookings")
const spotsRouter = require("./spots")
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/bookings', bookingsRouter);
router.use('/users', usersRouter);
router.use('/spots', spotsRouter);
router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

router.get("/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    'XSRF-Token': csrfToken
  });
});




// router.get('/spots/:spotId/bookings', async (req, res) => {

// })

module.exports = router;