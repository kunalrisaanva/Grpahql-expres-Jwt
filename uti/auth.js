const jwt = require("jsonwebtoken")

const createJwtToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRETKEY_KEY, {
    expiresIn: "2 days",
  })
}

module.exports = { createJwtToken }

   