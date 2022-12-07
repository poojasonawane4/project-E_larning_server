const { result } = require("lodash");
const _ = require("lodash");
const QuizModel = require("../models/quiz.model");
const CourseModel = require("../models/course.model");


class QuizCtrl {

  static pickQuiz(quiz) {
    return _.pick(quiz, [
      "_id",
      "title",
      "course",
      "questions",
      "question",
      "options",
      "answer"
    ]);
  }

  static createQuiz(req, res) {
    const quiz = req.body;
    console.log("quiz", req.body);
    new QuizModel(quiz)
      .save()
      .then((result) => {
        res
          .status(201)
          .send({ message: "Quiz created", data: QuizCtrl.pickQuiz(result) })
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Quiz not created", error: err });
      });
  }

  static fetchOneQuiz(req, res) {
    const { id } = req.params;

    QuizModel.findOne({ _id: id })
      .then((result) => {
        res
          .status(200)
          .send({ message: "quiz document", data: QuizCtrl.pickQuiz(result) });
      })
      .catch((err) => {
        console.log(err);
        res.status(404).send({ message: "Quiz not found", error: err });
      });
  }

  static updateQuiz(req, res) {
    const { id } = req.params;
    const quiz = req.body;

    QuizModel.findOneAndUpdate({ _id: id }, quiz, { new: true })
      .then((result) => {
        res
          .status(200)
          .send({ message: "Quiz updated", data: QuizCtrl.pickQuiz(result) })
      })
      .catch((err) => {
        console.log(err);
        res.status(404).send({ message: "Quiz not updated", error: err })
      })
  }

  static deleteQuiz(req, res) {
    const { id } = req.params;

    QuizModel.findByIdAndDelete({ _id: id })
      .then((result) => {
        res
          .status(200).send({ message: "Quiz deleted", data: QuizCtrl.pickQuiz(result) })
      })
      .catch((err) => {
        res
          .status(404)
          .send({ message: "Could not delete", error: err });
      })
  }

  static fetchAllQuiz(req, res) {

    QuizModel.find()
      .then((result) => {
        res.
          status(200)
          .send({ message: "fetch all users", data: QuizCtrl.pickQuiz(result) });
      })
      .catch((err) => {
        res
          .status(404).send({ message: "No quiz data found", error: err })
      })
  }

  static fetchAllCourses(req, res) {
    CourseModel.find()
      .populate("course")
      .exec()
      .then((result) => {
        res.status(201).send({ message: "courses are fetched", data: result });
      })
      .catch((err) => {
        console.error(err);
        res.status(404).send({ message: "Could not fetched", error: result });
      });
  }
}

module.exports = QuizCtrl;