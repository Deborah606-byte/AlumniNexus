const RSVP = require("../models/Rsvp");

const submitRSVP = async (req, res) => {
  const { fullName, email, phone, eventId } = req.body;

  try {
    // Check if user has already registered for the event
    const existingRSVP = await RSVP.findOne({ email: email, eventId: eventId });

    if (existingRSVP) {
      return res.status(400).json({
        message: 'fail',
        data: {
          message: 'You have already registered for this event.',
        },
      });
    }

    const newRSVP = new RSVP({
      fullName,
      email,
      phone,
      eventId,
    });

    const savedRSVP = await newRSVP.save();

    res.status(200).json({
      message: 'RSVP submitted successfully',
      rsvp: savedRSVP,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: 'Something went wrong',
    });
  }
};

module.exports = submitRSVP;
