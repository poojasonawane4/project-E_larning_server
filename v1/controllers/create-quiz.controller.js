const CreateQuizModel = require("../models/create-quiz.model");

class CreateQuiz {
    static createPaper(req, res) {
        const paper = req.body;
        console.log("paper", paper);
        new CreateQuizModel(paper)
            .save()
            .then((result) => {
                console.log(result);
                res.status(201).send({ message: "Paper created", data: result });
            })
            .catch((err) => {
                console.log("error", err);
                res.status(500).send({ message: "Not created", error: err });
            });
    }

    static fetchQue(req, res) {
        const { id } = req.params;
        console.log("all bamk", id)
        CreateQuizModel.find({ courseId: id })
            .then((result) => {

                res.status(201).send({ message: "quiz Fetched", data: result })
            })
            .catch((err) => {
                console.log("error", err);
                res.status(500).send({ message: "Not found", error: err });
            })

    }
}
module.exports = CreateQuiz;
