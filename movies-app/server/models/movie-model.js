const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Movie = new Schema(
    {
        fx: { type: String, required: false },
        x: { type: String, required: false },
        h: { type: String, required: false },
        level :{type :String, required:false},
        oh :{type :String , required:false},
        task :{type :String ,required:false}

    },
    { timestamps: true },
)

module.exports = mongoose.model('movies', Movie)