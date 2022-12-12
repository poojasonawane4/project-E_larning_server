const router = require("express").Router();

const {
  createQuiz,
  fetchOneQuiz,
  deleteQuiz,
  fetchAllQuiz,
  updateQuiz,
  fetchAllCourses,
} = require("../controllers/quiz.controller");

router.post("/", createQuiz);
router.get("/:id", fetchOneQuiz);
// router.get("/",fetchAllQuiz);
router.put("/:id", updateQuiz);
router.delete("/:id", deleteQuiz);
router.get("/", fetchAllCourses);

module.exports = router;
