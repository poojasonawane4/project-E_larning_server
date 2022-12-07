const router = require("express").Router();
const {
    createAnswer,
    fetchOneStudentResponse,
} = require("../controllers/student-quiz-response.controller");
router.post("/:id", createAnswer);
router.get("/:id", fetchOneStudentResponse);


module.exports = router;

