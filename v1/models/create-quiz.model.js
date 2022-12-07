const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const createquizSchema = new mongoose.Schema({
    paperId: Number,
    quizName: String,
    courseId: { type: mongoose.SchemaTypes.ObjectId, ref: "Course" },
    quiz: [
        {
            id: Number,
            courseId: String,
            quetion: String,
            options: [],
        },
    ],
    cretedAt: { type: Date, default: Date.now() },
});

createquizSchema.plugin(AutoIncrement, { inc_field: "paperId" });

module.exports = mongoose.model("CreateQuiz", createquizSchema);
