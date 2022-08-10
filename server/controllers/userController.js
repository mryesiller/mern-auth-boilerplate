const User = require("../models/userModel")
const validator = require("validator")

const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    if (!email || !password) {
      throw Error("All fields must be filled")
    }
    const user = await User.findOne({ email })
    if (!user) {
      throw Error("Incorrect email")
    }
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      throw Error("Incorrect password")
    }
    const token = await user.generateToken()
    res.status(200).json({ email, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const signupUser = async (req, res) => {
  const { email, password } = req.body

  try {
    if (!email || !password) {
      throw Error("All fields must be filled")
    }

    if (!validator.isEmail(email)) {
      throw Error("Email not valid")
    }
    if (!validator.isStrongPassword(password, [{ minLength: 6 }])) {
      throw Error("Password not strong enough")
    }

    const user = await User.findOne({ email })
    if (user) {
      throw Error("Email already in use")
    }
    const newUser = new User({ email, password })
    await newUser.save()
    const token = await newUser.generateToken()
    res.status(200).json({ email, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = { loginUser, signupUser }
