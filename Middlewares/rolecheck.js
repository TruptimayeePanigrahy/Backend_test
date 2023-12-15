const adminCheck = async (req, res, next) => {
  try {
    const role = req.body.role;

    if (role !== "admin") {
      return res.status(403).send({ msg: "User is not an admin" });
    }
    next();
  } catch (error) {
    res.status(500).send({ msg: error });
  }
};

module.exports = { adminCheck };
