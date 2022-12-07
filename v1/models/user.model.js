const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const userSchema = new mongoose.Schema({
  userId: Number,
  name: {
    first: { type: String, minlength: 3, maxlength: 45 },
    last: { type: String, minlength: 3, maxlength: 45 },
  },
  mobile: { type: String, minlength: 10, maxlength: 15 },
  email: {
    type: String,
    minlength: 10,
    maxlength: 100,
    unique: true,
    required: true,
  },
  password: String,
  gender: { type: String, minlength: 1, maxlength: 15 },
  dob: Date,
  role: String,
  status: Number, // (0 -inactive, 1- active, 2- deleted)
  avatar: String,
  Qualification: String,
  admission: String,
  address: {
    street: String,
    city: String,
    country: String,
    pincode: String,
  },
  demoId: { type: mongoose.SchemaTypes.ObjectId, ref: "Demo" },
  courseId: { type: mongoose.SchemaTypes.ObjectId, ref: "Course" },
  quiz: [],
  idDoc: String,
  createdAt: { type: Date, default: Date.now },
});

userSchema.plugin(AutoIncrement, { inc_field: "userId" });

module.exports = mongoose.model("User", userSchema);
