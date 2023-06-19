const fetch = require('express').Router()
const User = require('../models/user')

fetch.get('/get/:email', async (req, res) => {
  try {
    const user = await User.aggregate([{ $match: { email: req.params.email } }, { $sort: { loginTime: 1 } },
    { $project: { loginTime: 1, registeredTime: 1, logOutTime: 1, _id: 1, username: 1 } }]);
    return res.status(200).json(user)
  } catch (error) {
    return res.status(404).json(error.message)
  }
})

fetch.put('/put', async (req, res) => {
  try {
    const currentDate = new Date();
    const timestamp = currentDate.getDate() + "/" + `${currentDate.getMonth() + 1}` + "/" + currentDate.getFullYear() + " " +
      currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
    const user = await User.findByIdAndUpdate(req.body.id,
      { logOutTime: timestamp });
    return res.status(200).json(user)
  } catch (error) {
    return res.status(404).json(error.message)
  }
})

module.exports = fetch;[]