//create user model
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
})

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
  } catch (error) {
    next(error)
  }
})

userSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password)
  return isMatch
}

userSchema.methods.generateToken = async function () {
  const user = this
  const token = await jwt.sign(
    { _id: user._id.toString() },
    process.env.JWT_SECRET
  )

  user.tokens = user.tokens.concat({ token })
  await user.save()
  return token
}

const User = mongoose.model("User", userSchema)
module.exports = User
