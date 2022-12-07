const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const quizSchema = new mongoose.Schema({
    quizId:Number,
    title:String,
    questions:[{
        question:String,
        options:[],
        answer:String,
    }],
    courseId:{type:mongoose.SchemaTypes.ObjectId,ref:"Course"}
})

quizSchema.plugin(AutoIncrement,{inc_field:"quizId"});

module.exports = mongoose.model("Quiz",quizSchema);