const express = require('express');
const { Spot, SpotImage, User, Review } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

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

//Create a Spot
router.post("/", requireAuth, async (req, res) => {
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
router.post("/:spotId/spotimages", requireAuth, async (req, res) => {
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

//Updates and returns an existing spot
router.post("/:spotId", requireAuth, async (req, res) =>{
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

//Delete a Spot  (Add On Delete Cascade)
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



module.exports = router;