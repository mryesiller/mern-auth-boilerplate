const jwt = require("jsonwebtoken")
const User = require("../models/userModel")


const requireAuth = (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) {
    return res.status(401).json({ error: "Unauthorized" })
  }
  const token = authorization.split(" ")[1]
  try {  
    const {_id} = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findOne({_id}).select('_id')
    next()
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" })
  }
}

module.exports = requireAuth