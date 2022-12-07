const router = require("express").Router();

const {
    createReview,
    fetchReview,
} = require("../controllers/review.controller");

router.post("/", createReview);
router.get("/", fetchReview);

module.exports = router;
