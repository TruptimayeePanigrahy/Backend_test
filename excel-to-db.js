const xlsx = require("xlsx");
const mongoose = require("mongoose");
const { schoolmodel } = require("./models/schoolmodel");

require("dotenv").config();
mongoose.connect(process.env.mongourl);
const schoolWorkbook = xlsx.readFile("schools.xlsx");
const schoolWorksheet = schoolWorkbook.Sheets[schoolWorkbook.SheetNames[1]];
const schoolData = xlsx.utils.sheet_to_json(schoolWorksheet);

schoolmodel
  .insertMany(schoolData)
  .then(() => console.log("Data added into MongoDB"))
  .catch((err) => console.log(err));
