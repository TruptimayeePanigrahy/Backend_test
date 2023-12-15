const express = require("express");
const { schoolController } = require("../Controllers/schoolcontroller");
const schoolroute = express.Router();
const { auth } = require("../Middlewares/auth");
const { adminCheck } = require("../Middlewares/rolecheck");

schoolroute.post("/add", auth, adminCheck, schoolController.postSchool);
schoolroute.get("/get", schoolController.getSchool);
schoolroute.get("/getbyurn/:urn", auth, schoolController.getByurn);
schoolroute.patch(
  "/update/:urn",
  auth,
  adminCheck,
  schoolController.updateSchool
);
schoolroute.delete(
  "/delete/:urn",
  auth,
  adminCheck,
  schoolController.deleteSchool
);

module.exports = { schoolroute };
