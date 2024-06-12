const express = require('express');
const { Booking, Spot, SpotImage, User, Review, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const booking = require('../../db/models/booking');

const router = express.Router();

//Get all Spots
router.get("/", async (req, res) => {
    const spots = await Spot.findAll({
        include: [
            {model: SpotImage},
            {model: Review}
        ]
    });


    const spotsWithDetails = spots.map(spot => {
        //Extract preview image URL
        let previewImage = spot.SpotImages.find(image => image.preview);
        
        if (previewImage){
            previewImage = previewImage.url;
        } else {
            previewImage = "No Preview Image Available";
        }

        //Calculate average rating
        let totalStars = 0;
        let avgRating = 0;

        if (spot.Reviews.length > 0){
            totalStars = spot.Reviews.reduce((sum, review) => sum + review.stars, 0);
            avgRating = totalStars / spot.Reviews.length;
        }

        return {
            id: spot.id,
            ownerId: spot.ownerId,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            country: spot.country,
            lat: spot.lat,
            lng: spot.lng,
            name: spot.name,
            description: spot.description,
            price: spot.price,
            createdAt: spot.createdAt,
            updatedAt: spot.updatedAt,
            avgRating: avgRating.toFixed(1),
            previewImage: previewImage  
        };
    });

    return res.json({Spots: spotsWithDetails});
});

  //Get all Spots owned by the Current User
  router.get("/current", requireAuth, async (req, res) => {
    const {id} = req.user;

    const spots = await Spot.findAll({
        where: {ownerId: id}
    });

    if (spots){
        return res.json(spots);
    } else {
        return res.json({
            "message": "The current user does not own a place"
        })
    }
    
});


//Get details of a Spot from an id
router.get("/:spotId", async (req, res) => {
    const {spotId} = req.params;
    const spot = await Spot.findOne({
        where: {id: spotId},
        include: [
            {model: SpotImage},
            {model: User, as: "Owner", attributes: ["id", "firstName", "lastName"]}
        ]
    });
    if (spot){
        return res.json(spot);
    } else {
        return res.json({
            "message": "Spot couldn't be found"
          })
    }
    
});

const validateSpot = [
    check("address")
        .exists({ checkFalsy: true })
        .withMessage("Street address is required"),
    check("city")
        .exists({ checkFalsy: true })
        .withMessage("City is required"),
    check("state")
        .exists({ checkFalsy: true })
        .withMessage("State is required"),
    check("country")
        .exists({ checkFalsy: true })
        .withMessage("Country is required"),
    check("lat")
        .isFloat({min: -90, max: 90})
        .withMessage("Latitude must be within -90 and 90"),
    check("lng")
        .isFloat({min: -180, max: 180})
        .withMessage("Longitude must be within -180 and 180"),
    check("name")
        .isLength({max: 50})
        .withMessage("Name must be less than 50 characters"),
    check("description")
        .exists({ checkFalsy: true })
        .withMessage("Description is required"),
    check("price")
        .isFloat({gt: 0})
        .withMessage("Price per day must be a positive number"),
    handleValidationErrors
]
//Create a Spot
router.post("/", requireAuth, validateSpot, async (req, res) => {
    const {address, city, state, country, lat, lng, name, description, price} = req.body;
    const {id} = req.user;

    
    const newSpot = await Spot.create({
        ownerId: id,
        address: address,
        city: city,
        state: state,
        country: country,
        lat: lat,
        lng: lng,
        name: name,
        description: description,
        price: price
    });
    
    res.status(201);
    return res.json(newSpot);
});

//Add an Image to a Spot based on the Spot's id
router.post("/:spotId/images", requireAuth, async (req, res) => {
    const {spotId} = req.params;
    const {url, preview} = req.body;
    const {id} = req.user;

    const spot = await Spot.findByPk(spotId);

    if (spot){
        if (spot.ownerId === id){
            const newImage = await SpotImage.create({
                url,
                preview,
                spotId
            });

            const newImageRecord = await SpotImage.findByPk(newImage.id);
            res.status(201);
            return res.json(newImageRecord);

        } else {
            res.status(403);
            res.json({
                "message": "Forbidden"
              })
        }
    } else {
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found"
          })
    }

});

//Edit a Spot
router.put("/:spotId", requireAuth, validateSpot, async (req, res) =>{
    const {spotId} = req.params;
    const {address, city, state, country, lat, lng, name, description, price} = req.body;
    const {id} = req.user;

    const updateSpot = await Spot.findByPk(spotId);

    if (updateSpot){

        if (id === updateSpot.ownerId){
            updateSpot.set({
                ownerId: id,
                address: address,
                city: city,
                state: state,
                country: country,
                lat: lat,
                lng: lng,
                name: name,
                description: description,
                price: price
            });
    
            await updateSpot.save();
    
            return res.json(updateSpot);
        } else {
            res.status(403);
            res.json({
                "message": "Forbidden"
              })
        }

    } else {
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found"
          })
    }
});

//Delete a Spot
router.delete("/:spotId", requireAuth, async(req, res) => {
    const {spotId} = req.params;
    const {id} = req.user;

    const deleteSpot = await Spot.findByPk(spotId);

    if (deleteSpot){
        if (id === deleteSpot.ownerId){
            await deleteSpot.destroy();
            res.json({
                "message": "Successfully deleted"
              });

        } else {
            res.status(403);
            res.json({
                "message": "Forbidden"
              });
        }
    } else {
        res.status(404);
        res.json({
            "message": "Spot couldn't be found"
          });
    }
});


//Get all Reviews by a Spot's id
router.get("/:spotId/reviews", async (req, res) => {
    const {spotId} = req.params;

    const reviews = await Review.findAll({
        where: {spotId: spotId},
        include: [
            {model: User, attributes: ["id", "firstName", "lastName"]},
            {model: ReviewImage, attributes: ["id", "url"]}
        ] 
    });

    if (reviews && reviews.length > 0){
        res.json(reviews);
    } else {
        res.status(404);
        res.json({
            "message": "Spot couldn't be found"
        });
    }
});

const validateReview = [
    check("review")
        .exists({ checkFalsy: true})
        .withMessage("Review text is required"),
    check("stars")
        .isInt({min: 1, max: 5})
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
]

//Create a Review for a Spot based on the Spot's id
router.post("/:spotId/reviews", requireAuth, validateReview, async (req, res) => {
    const {id} = req.user;
    const {spotId} = req.params;
    const {review, stars} = req.body;

    const spot = await Spot.findByPk(spotId);

    if (spot) {
        const checkUserReviewExist = await Review.findOne({
            where: {
                spotId: spotId,
                userId: id
            }
        });

        if (!checkUserReviewExist){
            const newReview = await Review.create({
                userId: id,
                spotId: spotId,
                review: review,
                stars: stars
            });
    
            res.status(201);
            res.json(newReview);
        } else {
            res.status(500);
            res.json({
                "message": "User already has a review for this spot"
            });
        }
    } else {
        res.status(404);
        res.json({
            "message": "Spot couldn't be found"
        });
    }
});

const validateBooking = [
    check("startDate")
        .custom(value => {
            const startDate = new Date(value);
            const currentDate = new Date();
            if (startDate < currentDate){
                throw new Error("startDate cannot be in the past")
            }
        }),
    check("endDate")
        .custom((value, {req}) => {
            const endDate = new Date(value);
            const startDate = new Date(req.body.startDate);

            if (endDate <= startDate){
                throw new Error("endDate cannot be on or before startDate");
            }
        }),
    handleValidationErrors
]

//Create a Booking from a Spot based on the Spot's id
router.post("/:spotId/bookings", requireAuth, validateBooking, async (req, res) => {
    const {id} = req.user;
    const {spotId} = req.params;
    const {startDate, endDate} = req.body;

    const spot = await Spot.findByPk(spotId);

    if (spot) {
        if (spot.ownerId !== id){
            const newBooking = await Booking.create({
                spotId: spotId,
                userId: id,
                startDate: startDate,
                endDate: endDate
            });
    
            res.status(201);
            res.json(newBooking)
    
        } else {
            res.status(403);
            res.json({
                "message": "Forbidden"
            });
        }
    } else {
        res.status(404);
        res.json({
            "message": "Spot couldn't be found"
        });
    }

});


module.exports = router;