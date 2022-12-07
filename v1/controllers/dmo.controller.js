const DemoModel = require("../models/demo.model");
const userModel = require("../models/user.model");
const UserModel = require("../models/user.model");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const myNumber = process.env.myNumber;
class demoCtrl {


    //   get all demos
    static fetchAllDemo(req, res) {
        const { admission } = req.query;
        var filter = [];
        if (admission == "admission") {
            var filter = { $or: [{ admission: "admission" }] };
        } else if (admission == "inquiry") {
            var filter = { $or: [{ admission: "inquiry" }] };
        } else var filter = { $or: [{ admission: "inquiry" }, { admission: "admission" }] };

        DemoModel.find(filter)
            .populate("student")

            .then((result) => {
                console.log(result);
                res.status(200).send({ message: "All enquired student", data: result });
            })
            .catch((err) => {
                res.status(404).send({ message: "Data not found", error: err });
            });
    }

    static createDemo(req, res) {
        //for sms sending
        const demo = req.body;
        const studentId = demo.student;

        console.log("demo", demo);
        userModel.findById(studentId)
            .then((result) => {

                client.messages
                    .create({
                        body: 'Dear Parent,Thank you for registering whit us please update your reaming details to get personalized Coding Fundamental',
                        from: '+15139513758',
                        to: `+91${result.mobile}`,
                    })
                    .then(message => console.log("ssid", message.sid))
                    .catch((err) => { console.log("err", err) })


                new DemoModel(demo)
                    .save()
                    .then((result) => {
                        console.log("id", result);
                        UserModel.findOneAndUpdate({ _id: result.student }, { demoId: result._id, courseId: demo.courseId }, { new: true })
                            .then(console.log)
                        res
                            .status(201)
                            .send({ message: "demo created", data: result });
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(500).send({ message: "Demo not created", error: err });
                    });

            })

            .catch((err) => {
                console.log(err);
                res.status(404).send({ message: "Student not available", error: err });
            });




    }
    static fetchOneDemo(req, res) {
        const { id } = req.params;
        console.log("demoId", id);
        DemoModel.findById({ _id: id })
            .then((result) => {
                res
                    .status(200)
                    .send({ message: "student document", data: result });
            })
            .catch((err) => {
                console.log(err);
                res.status(404).send({ message: "User not found", error: err });
            });
    }

    static admissionUpdate(req, res) {
        const { id } = req.params;
        const demo = req.body;
        console.log("demo", demo);
        DemoModel.findOneAndUpdate({ _id: id }, demo, { new: true }) //{ new: true } - this will return updated data
            .then((result) => {
                UserModel.findOneAndUpdate({ _id: demo.student }, { admission: demo.admission }, { new: true })
                    .then((result) => {
                        res
                            .status(200)
                            .send({ message: "admission status changed", data: result });
                    })
                    .catch((err) => {
                        console.log(err);
                    })


            })
            .catch((err) => {
                console.error(err);
                res.status(404).send({ message: "admission status not changed", error: err });
            });
    }


}
module.exports = demoCtrl;
