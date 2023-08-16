const express = require('express');
const router = express.Router();
const Booking = require("../models/booking");
const Room = require("../models/room");

router.post("/bookroom", async (req, res) => {
  const {
    roomid,
    userid,
    fromdate,
    todate,
    totalamount,
    totaldays
  } = req.body;

  try {
    const roomtemp = await Room.findOne({ _id: roomid });

    const newbooking = new Booking({
      room: roomtemp.name,
      roomid,
      userid,
      fromdate,
      todate,
      totalamount,
      totaldays,
    });

    const booking = await newbooking.save();

    roomtemp.bookings.push({
      bookingid: booking._id,
      fromdate: fromdate,
      todate: todate,
      userid: userid,
      status: booking.status,
    });

    await roomtemp.save();

    res.send('Room Booked Successfully');
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
