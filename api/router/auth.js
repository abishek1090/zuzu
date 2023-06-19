const auth = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

auth.post('/register', async (req, res) => {
  try {
    const isExisting = await User.findOne({ email: req.body.email })
    if (isExisting) {
      return res
        .status(400)
        .json('User already exists')
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const currentDate = new Date();
    const timestamp = currentDate.getDate() + "/" + `${currentDate.getMonth() + 1}` + "/" + currentDate.getFullYear() + " " +
      currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();

    req.body.loginTime = timestamp;
    req.body.registeredTime = timestamp;
    req.body.logOutTime = "";
    const newUser = await User.create({ ...req.body, password: hashedPassword })
    const { password, ...others } = newUser._doc
    const token = jwt.sign(
      { id: newUser._id },
      '641958e3f2d9d7a30e2608fe',
      { expiresIn: '1h' }
    )

    return res.status(201).json({ others, token })
  } catch (error) {
    return res.status(404).json(error.message)
  }
})

auth.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      return res.status(404).json("No Such User!");
    }
    const comparePass = await bcrypt.compare(req.body.password, user.password)
    if (!comparePass) {
      return res.status(404).json('User credentials are wrong!')
    }
    const currentDate = new Date();
    const timestamp = currentDate.getDate() + "/" + `${currentDate.getMonth() + 1}` + "/" + currentDate.getFullYear() + " " +
      currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();

    req.body.loginTime = timestamp;
    req.body.logOutTime = "";
    await User.create(req.body);
    const { password, ...others } = user
    const token = jwt.sign(
      { id: user._id },
      '641958e3f2d9d7a30e2608fe',
      { expiresIn: '1h' }
    )

    return res.status(200).json({ others, token })
  } catch (error) {
    return res.status(404).json(error.message)
  }
})

module.exports = auth
