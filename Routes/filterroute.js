const { filtercontroller } = require("../Controllers/filterController");
const express = require("express");
const filterroute = express.Router();

filterroute.get("/search", filtercontroller.search);
filterroute.get("/filter", filtercontroller.filter);

module.exports = { filterroute };
