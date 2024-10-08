var mongoose = require('mongoose')

var plm = require('passport-local-mongoose')

mongoose.connect('mongodb://0.0.0.0/local-01')

var userSchema = mongoose.Schema({
  username: String,
  password: String,

})

userSchema.plugin(plm)
module.exports = mongoose.model('user',userSchema)