let router = require('express').Router();
let Users = require('../models/user');
let session = require('./sessions')

let loginError = new Error('Bad Email or Password')


router.post('/register', (req, res) => {
  if (req.body.password.length < 5) {
    return res.status(400).send({
      error: 'Password must be at least 6 characters'
    })
  }
  req.body.role = 'ensign'
  req.body.hash = Users.generateHash(req.body.password)
  Users.create(req.body)
    .then(user => {
      delete user._doc.hash
      req.session.uid = user._id
      res.send(user)

      // req.session.uid = user._id
      // req.session.save()
      // user.password = null
      // delete user.password
      // res.send({
      //   message: 'Successfully created user account',
      //   data: user

    })
    .catch(err => {
      //res.send({ error: err })
      res.status(400).send(err)
    })
})


router.post('/login', (req, res) => {
  Users.findOne({ name: req.body.name })
    .then(user => {
      user.validatePassword(req.body.password)
        .then(valid => {
          if (!valid) {
            return res.status(400).send(loginError)
          }

          if (!user.validatePassword(req.body.password)) {
            return res.status(400).send(loginError)
          }
          delete user._doc.hash
          req.session.uid = user._id
          res.send(user)
        }).catch(err => {
          res.status(400).send(loginError)
        })
      //         return res.status(401).send({error: 'Invalid Email or Password'})
      //       }

      //       req.session.uid = user._id;
      //       req.session.save()
      //       user.password = null
      //       delete user.password
      //       res.send({
      //         message: 'successfully logged in',
      //         data: user
      //       })
      //     })
      //     .catch(err => {
      //       res.status(401).send({ error: err || 'Invalid Email or Password' })
      //     })
      // })
      // .catch(err => {
      //   res.status(401).send({
      //     error: err,
      //     message: 'Invalid Email or Password'
      //   })
      // })
    })
})

router.delete('/auth/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.send(err)
    }
    return res.send({
      message: 'Logout Successful'
    })
  })
})


router.get('/authenticate', (req, res) => {
  Users.findById(req.session.uid).then(user => {
    if (!user) {
      return res.status(401).send({ "error": "Please Login" })
    }
    return res.send({
      data: user
    })
  }).catch(err => {
    return res.status(500).send({
      error: err
    })
  })
});



module.exports = {
  router,
  session
}