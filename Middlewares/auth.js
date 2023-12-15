const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.send({ msg: "please login" });
    }
    const verifytoken = jwt.verify(token, process.env.secrete);
    if (!verifytoken) {
      return res.send({ msg: "invalid token" });
    }
    req.body.userid = verifytoken.userid;
    req.body.email = verifytoken.email;
    req.body.role = verifytoken.role;

    next();
  } catch (error) {
    res.send({ msg: error });
  }
};

module.exports = { auth };
