const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const reviewSchema = new mongoose.Schema({
    reviewId: Number,
    student: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    email: String,
    text: String,
});

reviewSchema.plugin(AutoIncrement, { inc_field: "reviewId" });
module.exports = mongoose.model("Review", reviewSchema);
