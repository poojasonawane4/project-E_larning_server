const ReviewModel = require("../models/review.model");

class Review {
    static createReview(req, res) {
        const review = req.body;
        console.log(req.body);
        new ReviewModel(review)
            .save()
            .then((result) => {
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    static fetchReview(req, res) {
        ReviewModel.find()
            .then((result) => {
                console.log("reviewresult", result);
                res.status(200).send({ message: "Review available", data: result });
            })
            .catch((err) => {
                console.log(err);
                res.status(404).send({ message: "Review not available", error: err });
            });
    }
}

module.exports = Review;
