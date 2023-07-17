
const express = require('express');
const router = express.Router();
const { Booking } = require('../../db/models')

router.put("/:id", async (req, res) => {

  const user = req.user;
  if (!user) {
    return res.status(401).json("User not authenticated");
  }

  let booking = await Booking.findByPk(req.params.id);

  if (booking === null) {
    return res.status(404).json("Spot not found!");
  }

  booking = await Spot.findOne({
    where: {
      id: req.params.id,
      ownerId: user.id
    }
  });

  if (booking === null) {
    return res.status(401).json("User not owner of spot!");
  }

  await Booking.update(req.body, {
    where: {
      id: req.params.id
    }
  });

  booking = await Booking.findOne({
    where: {
      id: req.params.id,
    }
  });
  return res.json(booking); 
})


router.put("/:id", async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json("User not authenticated");
  }

  let booking = await Booking.findByPk(req.params.id);

  if (booking === null) {
    return res.status(404).json("Booking not found!");
  }

  if (booking.userId !== user.id) {
    return res.status(403).json("User is not the owner of the Booking");
  }

  if (new Date(booking.endDate) < new Date()) {
    return res.status(400).json("Cannot edit past bookings");
  }

  const { spotId, startDate, endDate } = req.body;

  const existingBooking = await Booking.findOne({
    where: {
      spotId,
      id: { [Op.not]: req.params.id },
      [Op.or]: [
        {
          startDate: { [Op.lte]: endDate },
          endDate: { [Op.gte]: startDate },
        },
        {
          startDate: { [Op.between]: [startDate, endDate] },
        },
        {
          endDate: { [Op.between]: [startDate, endDate] },
        },
      ],
    },
  });

  if (existingBooking) {
    return res.status(403).json("Booking already exists for the spot on the specified dates");
  }

  try {
    await booking.update(req.body);
    booking = await Booking.findByPk(req.params.id);
    return res.json(booking);
  } catch (error) {
    return res.status(400).json("Invalid request");
  }
});

module.exports = router;