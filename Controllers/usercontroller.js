const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Usermodel } = require("../models/usermodel");
require("dotenv").config();

const Usercontroller = {
  register: async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
      const IsUser = await Usermodel.findOne({ email });
      if (IsUser) {
        return res
          .status(400)
          .send({ msg: "user already present please login" });
      }
      const hashpassword = bcrypt.hashSync(password, 8);
      const newuser = new Usermodel({
        name,
        email,
        password: hashpassword,
        role,
      });
      await newuser.save();
      res.status(201).send({ msg: "signup successful" });
    } catch (error) {
      res.status(400).send({ msg: error });
    }
  },

  Login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const Isuserpresent = await Usermodel.findOne({ email });
      if (!Isuserpresent) {
        return res.send({ msg: "please signup" });
      }
      const decrypt = await bcrypt.compare(password, Isuserpresent.password);
      if (!decrypt) {
        return res.send({ msg: "incorrect password" });
      }
      const token = jwt.sign(
        {
          email: Isuserpresent.email,
          userid: Isuserpresent._id,
          role: Isuserpresent.role,
        },
        process.env.secrete,
        { expiresIn: "6hr" }
      );
      res.status(201).send({
        msg: "login successful",
        token: token,
        username: Isuserpresent.name,
      });
    } catch (error) {
      res.status(400).send({ msg: error });
    }
  },
};

module.exports = { Usercontroller };
