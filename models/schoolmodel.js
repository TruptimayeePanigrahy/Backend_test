const mongoose = require("mongoose");

const schoolSchema = mongoose.Schema(
  {
    urn: { type: String, require: true, unique: true },
    establishmentName: { type: String, require: false },
    typeOfEstablishment: { type: String, require: false },
    establishmentStatus: { type: String, require: false },
    statutoryLowAge: { type: String, require: false },
    statutoryHighAge: { type: String, require: false },
    boarders: { type: String, require: false },
    gender: { type: String, require: false },
    admissionsPolicy: { type: String, require: false },
    schoolCapacity: { type: String, require: false },
    numberOfPupils: { type: String, require: false },
    OfstedLastInsp: { type: String, require: false },
    numberOfBoys: { type: String, require: false },
    numberOfGirls: { type: String, require: false },
    OfstedRating: { type: String, require: false },
    Street: { type: String, require: false },
    locality: { type: String, require: false },
    address: { type: String, require: false },
    town: { type: String, require: false },
    county: { type: String, require: false },
    postcode: { type: String, require: false },
    region: { type: String, require: false },
    schoolWebsite: { type: String, require: false },
    telephoneNum: { type: String, require: false },
    headTitle: { type: String, require: false },
    headFirstName: { type: String, require: false },
    headLastName: { type: String, require: false },
    headPreferredJobTitle: { type: String, require: false },
  },
  {
    Versionkey: false,
  }
);
const Schoolmodel = mongoose.model("school", schoolSchema);

module.exports = { Schoolmodel };
