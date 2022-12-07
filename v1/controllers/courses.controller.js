const CourseModel = require("../models/course.model");
const UserModel = require("../models/user.model")
class CourseCtrl {

    static createCourse(req, res) {
        const course = req.body;

        new CourseModel(course)
            .save()
            .then((result) => {
                res
                    .status(201)
                    .send({ message: "course created", date: result });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send({ message: "course not created", error: err });
            });
    }

    static updateCourse(req, res) {
        const { id } = req.params;
        const course = req.body;

        CourseModel.findOneAndUpdate({ _id: id }, course, { new: true })
            .then((result) => {
                res
                    .status(200)
                    .send({ message: "course updated", data: result });
            })
            .catch((err) => {
                console.log(err);
                res.status(404).send({ message: "course not updated", error: err });
            });
    }

    static deleteCourse(req, res) {
        const { id } = req.params;

        CourseModel.findOneAndUpdate({ _id: id }, { status: 2 })
            .then((result) => {
                res
                    .status(200)
                    .send({ message: "Course deleted", data: result });
            })
            .catch((err) => {
                console.log(err);
                res.status(404).send({ message: "Course not deleted", error: err });
            });
    }

    static fetchOneCourse(req, res) {
        const { id } = req.params;
        CourseModel.findOne({ _id: id })
            .then((result) => {
                res.status(200)
                    .send({ message: "Course document", data: result });
            })
            .catch((err) => {
                console.log(err);
                res.status(404).send({ message: "Course not found", error: err });
            });
    }

    static fetchAllCourse(req, res) {


        const filter = { $or: [{ status: 0 }, { status: 1 }] }; //$or is the syntax of mongodb, we either want status 0 or status 1 users


        CourseModel.find(filter)
            .then((result) => {
                console.log("result", result);
                res.status(200).send({
                    message: "Course List",
                    data: result.map((course) => course), //this map method we are calling on lodash, it taking variable and callback function defined format
                });
            })
            .catch((err) => {
                console.log(err);
                res.status(404).send({ message: "course not available", error: err });
            });
    }
    //dashboard related code
    // static async userStatistics(req, res) {
    //     const { role = "customer" } = req.query;

    //     const inactive = await UserModel.countDocuments({ status: 0, role });
    //     const active = await UserModel.countDocuments({ status: 1, role });
    //     const deleted = await UserModel.countDocuments({ status: 2, role });

    //     res.status(200).send({
    //         message: `${role} details`,
    //         data: { active, inactive, deleted },
    //     });
    // }
}

module.exports = CourseCtrl;
