var express = require('express')
var bp = require('body-parser')
var app = express()
var cors = require('cors')
var port = 3000

app.use(cors())
//Fire up database connection
require('./db/mlab-config')

//var auth = require('./authentication/auth')


//REGISTER MIDDLEWEAR
app.use(bp.json())
app.use(bp.urlencoded({
  extended: true
}))

var auth = require('./authentication/routes')
//auth = require('./authentication/auth')
app.use(auth.session)
app.use(auth.router)

// app.use(auth.router)


app.use('/members/*', (req, res, next) => {
  if (!req.session.uid) {
    return res.status(401).send({
      error: 'please login to continue'
    })
  }
  next()
})

app.use('/admin/*', (req, res, next) => {
})

//app.use('/members/', galaxies.router)
app.get('*', (req, res, next) => {
  res.status(404).send({
    error: 'No matching routes'
  })
})

// app.listen(3000)

app.listen(port, () => {
  console.log('server running on port', port)
 })