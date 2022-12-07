const router = require("express").Router();
const authorize = require("../../helpers/middlewares/authorize.js");


const { createCourse, updateCourse, fetchAllCourse, fetchOneCourse, deleteCourse } = require("../controllers/courses.controller")

router.post(
    "/",

    authorize(["admin"]),
    createCourse
); //when your path get matched with / at that time it will get executed and we are uploading single profile picture

router.put(
    "/:id",
    authorize(["admin",]),
    updateCourse
);

router.delete("/:id", authorize(["admin"]), deleteCourse);


router.get(
    "/:id",
    authorize(["teacher", "admin", "student"]),
    fetchOneCourse
);
router.get("/", authorize(["teacher", "admin", "student"]), fetchAllCourse);

module.exports = router;
