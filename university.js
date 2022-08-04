const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fuUniversity = new Schema({
    __id: String,

    name: String,
    ranking: Number,
    degree: String,
    public: String,
    country: String,
    location: {
        state: String,
        address: String
    },
    date: String,
    desc: String,
    course: [
        String
    ],
    applink: String
})

module.exports = mongoose.model('universities', fuUniversity);