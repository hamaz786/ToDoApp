const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')

const mongoose = require('mongoose')

const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const PORT=process.env.PORT || 5000;

const JWT_SECRET =
  'hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe'

// intialize server
const server = express()
mongoose
  .connect('mongodb://127.0.0.1:27017/TodoList')
  .then(() => console.log('Connected!'))

// To communicate with other other service sattifying cors policy
server.use(cors())

// Middleware
server.use(bodyParser.json())

// import UserDetails schema to create model
require('./userDetails')
const User = mongoose.model('Users')

// Get data from user
server.post('/register', async (req, res) => {
  const { name, email, phone, password } = req.body
  const encryptedPassword = await bcrypt.hash(password, 10)
  try {
    const OldUser = await User.findOne({ email })
    if (OldUser) {
      return res.send({ error: 'User Exist' })
    }
    let data = await User.create({
      name,
      email,
      phone,
      password: encryptedPassword,
    })

    console.log(data)
    res.send({ status: 'ok' })
  } catch (error) {
    res.send({ status: 'error' })
  }
})

// Authenthicate the user login and passoword
server.post('/login-user', async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    return res.send({ status: 'error', error: 'UserName Not found' })
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET)

    if (res.status(201)) {
      return res.json({ status: 'ok', data: token })
    } else {
      return res.json({ error: 'error' })
    }
  }
  res.json({ status: 'error', error: 'Invalid Password' })
})

//  Server listening at Port 5000
server.listen(PORT, () => {
  console.log('Server started')
})
