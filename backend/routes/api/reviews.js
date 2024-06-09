const express = require('express');
const { Review, User, Spot, SpotImage, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//Get all Reviews of the Current User
router.get("/current", requireAuth, async (req, res) => {
    const {id} = req.user;

    const reviews = await Review.findAll({
        where: {userId: id},
        include: [
            {model: User, attributes: ["id", "firstName", "lastName"]},
            {model: Spot, attributes: [
                "id",
                "ownerId",
                "address",
                "city",
                "state",
                "country",
                "lat",
                "lng",
                "name",
                "price"
            ], include: [{model: SpotImage, attributes: ["url", "preview"]}]},
            {model: ReviewImage, attributes: ["id", "url"]}
        ]
    });

    const reviewsWithPreviewImage = reviews.map(review => {
        //Convert the Spot model instance into a plain object
        const spot = review.Spot.toJSON();

        //Find the preview image URL
        let previewImage = spot.SpotImages.find(image => image.preview);
                
        if (previewImage){
            previewImage = previewImage.url;
        } else {
            previewImage = "No Preview Image Available";
        }

        //Remove the SpotImages array
        delete spot.SpotImages;

        //Add the previewImage field to the Spot object
        spot.previewImage = previewImage;

        //Convert the Review model instance into a plain object and include the modified Spot object
        return {
            ...review.toJSON(),
            Spot: spot
        };
    });

    res.json({Reviews: reviewsWithPreviewImage});
});


module.exports = router;