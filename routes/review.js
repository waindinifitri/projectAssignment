const express = require("express");
const router = express.Router();

const {reviewController} = require('../controllers/review')
const { authentication, authorization } = require('../middlewares/auth')

router.get('/list',authentication,authorization,reviewController.getReview)
router.post('/add/:id', authentication,authorization, reviewController.addReview)
router.get('/movie/:movieId',authentication,authorization, reviewController.getReviewbyTask)
router.put('/update/:id',authentication, authorization, reviewController.updateReview)
router.delete('/delete/:id',authentication, authorization, reviewController.deleteReview)



module.exports = router;
