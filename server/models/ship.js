let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId


let schema = new Schema({
    ship: { type: String, required: true },
    registry: { type: String },
    shipClass: { type: String },
    shipId: {
        type: ObjectId,
        ref: 'User',
        required: true
    }
})


module.exports = mongoose.model('ship', schema)
