
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

module.exports = router;