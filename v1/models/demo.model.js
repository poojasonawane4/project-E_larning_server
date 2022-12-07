const { times } = require("lodash");
const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const DemoSchema = new mongoose.Schema({

    demoId: Number,
    student: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    courseId: { type: mongoose.SchemaTypes.ObjectId, ref: "Courses" },
    className: String,
    demoDate: Date,
    demoTime: Date,
    paidAmount: { type: Number, default: 0 },
    paymentMode: String,
    status: String,
    admission: String,
    cretedAt: { type: Date, default: Date.now() }
})

DemoSchema.plugin(AutoIncrement, { inc_field: "demoId" });

module.exports = mongoose.model("Demo", DemoSchema);
