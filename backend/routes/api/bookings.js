const express = require('express');
const { Booking, Review, User, Spot, SpotImage, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//Get all of the Current User's Bookings
router.get("/current", requireAuth, async (req, res) => {
    const {id} = req.user;
    
});














module.exports = router;