const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const courseSchema = new mongoose.Schema({
    courseId: Number,
    course: String,
    duration: String,
    fee: String,
    status: Number,
    quizId: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Quiz" }],
    createdAt: { type: Date, default: Date.now },
});

courseSchema.plugin(AutoIncrement, { inc_field: "courseId" });


module.exports = mongoose.model("Course", courseSchema);

