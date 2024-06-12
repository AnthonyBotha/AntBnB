// backend/utils/validation.js
const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) { 
    const errors = {};
    let userAlreadyExists = false;
    validationErrors
      .array()
      .forEach(error => {
        if (error.msg === "User with that email already exists" || error.msg === "User with that username already exists"){
          userAlreadyExists = true;
          errors[error.path] = error.msg
        } else {
          errors[error.path] = error.msg
        }
        
      });

    if (userAlreadyExists){
      const err = Error("User already exists");
      err.errors = errors;
      err.status = 500;
      next(err);

    } else {
      const err = Error("Bad request");
      err.errors = errors;
      err.status = 400;
      next(err);
    }

  }
  next();
};

const checkBookingConflict = (req, res, next) => {
  const {startDate, endDate} = req.body;

  //Check if dates conflict with existing bookings
  const isConflict = checkForBookingConflict(startDate, endDate);

  if (isConflict){
    res.status(403);
    res.json({
      message: "Sorry, this spot is already booked for the specified dates",
      errors: {
          startDate: "Start date conflicts with an existing booking",
          endDate: "End date conflicts with an existing booking"
      }
    });
  }
  next();
}

const checkForBookingConflict = async (startDate, endDate) => {
  const conflictingBookings = await checkBookingConflict.findAll({})
}

module.exports = {
  handleValidationErrors
};