const router = require("express").Router();
const multer = require("multer");
const path = require("path"); //to get the file extension
const authorize = require("../../helpers/middlewares/authorize.js");
const { validateUser } = require("../../helpers/middlewares/user.validation");
//Form data if excel is presernt in 

const { createQuetion, fetchAllQuestionBank } = require("../controllers/quetions.controller");
router.post(
    "/",

    // validateUser,
    authorize(["teacher"]),
    createQuetion
);
router.get(
    "/",

    // validateUser,
    authorize(["teacher"]),
    fetchAllQuestionBank
);



module.exports = router;