const QuetionModel = require("../models/quetion.model");
const fs = require("fs");


class QuetionCtrl {
    static createQuetion(req, res) {
        const quetionbank = req.body;
        console.log("quetionbank", quetionbank);
        new QuetionModel(quetionbank)
            .save()
            .then((result) => {


                res
                    .status(201)
                    .send({ message: "quetionbank created", data: result });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send({ message: "quetionbank not created", error: err });
            });


    }
    static fetchAllQuestionBank(req, res) {
        const { courseId } = req.query;
        console.log(courseId);

        QuetionModel
            .find()
            .then((result) => {
                console.log("course result", result);

                const que = result.flatMap((resu, i) => {
                    // // console.log("resu", resu);
                    const questions = resu.data.filter((final, i) => {
                        console.log("final", final);
                        return final.courseId == courseId;
                    });
                    console.log("question", questions);
                    return questions;
                });

                console.log("que", que);
                res.status(200).send({
                    message: "question document",
                    data: que,
                });
            })
            .catch((err) => {
                console.log(err);
                res.status(404).send({ message: "questionbank not found", error: err });
            });
    }
}
module.exports = QuetionCtrl; 