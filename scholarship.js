const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fuScholarship = new Schema({
    __id: String,

    name: String,
    location: String, //local/overseas, Malaysia/Singapore
    date: {
        opening: String,
        closing: String,
    },
    age: String,
    acadReq: [
        String
    ],
    longReq: [
        String
    ],
    bond: {
        for: String,
        duration: String
    },
    degree: String,
    grad: String,
    allowance: [
        String
    ],
    applink: String
});

module.exports = mongoose.model('scholarships', fuScholarship);