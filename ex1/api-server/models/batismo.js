const mongoose = require('mongoose')


var batismoSchema = new mongoose.Schema({
    _id: String,
    date: String,
    year: Number,
    title: String,
    pai: String,
    mae: String,
    ref: String,
    href: String
})


module.exports = mongoose.model('batismo', batismoSchema)
