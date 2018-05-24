let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId


let schema = new Schema({
    body: { type: String, required: true },
    author: { type: ObjectId, ref: 'User'},
    log: {type: ObjectId, ref: 'Log'},
    starDate: {type: Number, default: Date.now(), required: true}
}
)


module.exports = mongoose.model('Comment', schema)
