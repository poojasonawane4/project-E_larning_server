const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const studentsQuizResponseSchema = new mongoose.Schema({
    studentsAnsId: Number,
    courseId: { type: mongoose.SchemaTypes.ObjectId, ref: "Course" },
    studentsId: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    quizId: { type: mongoose.SchemaTypes.ObjectId, ref: "CreateQuiz" },
    quiz: [{
        id: Number,
        courseId: { type: mongoose.SchemaTypes.ObjectId, ref: "Course" },
        quetion: String,
        options: [{
            opt: String,
            optId: Number,
            status: Boolean,
        }],
        quetionId: { type: mongoose.SchemaTypes.ObjectId, ref: "Quetion" }

    }],

    createdAt: { type: Date, default: Date.now },
})

studentsQuizResponseSchema.plugin(AutoIncrement, { inc_field: "studentsAnsId" });

module.exports = mongoose.model("StudentsAnswer", studentsQuizResponseSchema);