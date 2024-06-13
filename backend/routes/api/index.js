// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require("./spots.js")
const reviewsRouter = require("./reviews.js");
const bookingsRouter = require("./bookings.js");
const spotimagesRouter = require("./spot-images.js");
const reviewimagesRouter = require("./review-images.js");
const { restoreUser } = require("../../utils/auth.js");

const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);

router.get('/restore-user',(req, res) => {
    return res.json(req.user);
  }
);


router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use("/spots", spotsRouter);

router.use("/reviews", reviewsRouter);

router.use("/bookings", bookingsRouter)

router.use("/spot-images", spotimagesRouter);

router.use("/review-images", reviewimagesRouter);



// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//     where: {
//       username: 'Demo-lition'
//     }
//   });
//   setTokenCookie(res, user);
//   return res.json({ user: user });
// });

// // GET /api/require-auth
// const { requireAuth } = require('../../utils/auth.js');
// router.get('/require-auth',requireAuth,(req, res) => {
//     return res.json(req.user);
//   }
// );



module.exports = router;

