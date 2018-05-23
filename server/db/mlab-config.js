var mongoose = require('mongoose')
var connectionString = 'mongodb://testing123:testing123@ds133360.mlab.com:33360/star-log-eric-steve'
var connection = mongoose.connection


mongoose.connect(connectionString)

connection.on('error', err=>{
  console.log('ERROR FROM DATABASE: ', err)
})


connection.once('open', ()=>{
  console.log('Connected to Database')
})