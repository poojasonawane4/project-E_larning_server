const StudentQuizResponseModel = require("../models/student-quiz-response.model");
const UserModel = require("../models/user.model")
class StudentQuizResponse {
    static createAnswer(req, res) {
        console.log("req.params", req.params);

        const { id } = req.params;
        const answer = req.body;
        let quizId = answer.quizId;

        new StudentQuizResponseModel(answer)
            .save()
            .then((result) => {

                UserModel.findOneAndUpdate({ _id: id }, { $push: { quiz: quizId } }, { new: true })
                    .then((resp) => {
                        console.log("response", resp);

                        res
                            .status(201)
                            .send({ message: "quiz Completed", data: result });
                    })
                    .catch((err) => console.log(err))

            })
            .catch((err) => {
                console.log("error", err);
                res.status(500).send({ message: "Answer not created", error: err });
            });
    }

    static fetchOneStudentResponse(req, res) {
        let { id } = req.params;
        let { quizId } = req.body;

        let filter = { $and: [{ studentId: id }, { quizId: quizId }] }
        StudentQuizResponseModel.findOne(filter)
            .then((result) => {
                res
                    .status(200)
                    .send({ message: "user document", data: result });
            })
            .catch((err) => {
                console.log(err);
                res.status(404).send({ message: "User not found", error: err });
            });
    }
}



// static fetchQue(req, res) {
//     const { id } = req.params;
//     console.log("all bamk", id)
//     CreateQuizModel.find({ courseId: id })
//         .then((result) => {

//             res.status(201).send({ message: "quiz Fetched", data: result })
//         })
//         .catch((err) => {
//             console.log("error", err);
//             res.status(500).send({ message: "Not found", error: err });
//         })

// }
// }
module.exports = StudentQuizResponse;
