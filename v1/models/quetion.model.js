const { times } = require("lodash");
const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const QuetionSchema = new mongoose.Schema({

    quetionbankId: Number,
    data: [{
        id: Number,

        courseId: String,
        quetion: String,
        options: [

        ]
    }],
    cretedAt: { type: Date, default: Date.now() }
})

QuetionSchema.plugin(AutoIncrement, { inc_field: "quetionbankId" });

module.exports = mongoose.model("Quetion", QuetionSchema);
