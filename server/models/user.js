let mongoose = require('mongoose')
let Schema = mongoose.Schema
var schemaName = 'User'
let ObjectId = Schema.Types.ObjectId
let bcrypt = require('bcryptjs')
const SALT = 10

const RANKS = [
  'Ensign',
  'Lieutenant',
  'Captain',
  'Admiral'
]

let schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, dropDups: true },
  hash: { type: String, required: true },
  created: { type: Number, required: true, default: Date.now(),
    rank: {
    type: String,
    required: true,
    enum: RANKS,
    default: 'Ensign'
  },
  shipId: { type: ObjectId, ref: 'Ship' },
 }
})


schema.statics.generateHash = function (password) {
  return bcrypt.hashSync(password, SALT)
}

// schema.pre('save', function (next) {
//   var user = this;
//   if (!user.isModified('password')) {
//     return next();
//   }
//   bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
//     if (err) {
//       return next(err);
//     } else {
//       bcrypt.hash(user.password, salt, function (err, hash) {
//         user.password = hash;
//         next();
//       });
//     }
//   });
// });

schema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.hash)
}

// schema.methods.validatePassword = function (password) {
//   return new Promise((resolve, reject) => {
//     bcrypt.compare(password, this.password, function (err, isMatch) {
//       if (err || !isMatch) {
//         return reject(err);
//       }
//       return resolve(isMatch);
//     });
//   })
// };

module.exports = mongoose.model(schemaName, schema)