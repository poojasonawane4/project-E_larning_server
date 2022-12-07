const router = require("express").Router();

const {
    createPaper,
    fetchQue,
} = require("../controllers/create-quiz.controller");

router.post("/", createPaper);
router.get("/:id", fetchQue)

module.exports = router;
