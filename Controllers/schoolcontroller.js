const { Schoolmodel } = require("../models/schoolmodel");

const schoolController = {
  postSchool: async (req, res) => {
    const {
      urn,
      establishmentName,
      typeOfEstablishment,
      establishmentStatus,
      statutoryLowAge,
      statutoryHighAge,
      boarders,
      gender,
      admissionsPolicy,
      schoolCapacity,
      numberOfPupils,
      OfstedLastInsp,
      numberOfBoys,
      numberOfGirls,
      OfstedRating,
      Street,
      locality,
      address,
      town,
      postcode,
      county,
      region,
      schoolWebsite,
      telephoneNum,
      headTitle,
      headFirstName,
      headLastName,
      headPreferredJobTitle,
    } = req.body;
    const existschool = await Schoolmodel.findOne({ urn });
    console.log(existschool);
    if (existschool) {
      return res.status(400).send({ msg: "school already exist" });
    }
    const newschool = new Schoolmodel({
      urn,
      establishmentName,
      typeOfEstablishment,
      establishmentStatus,
      statutoryLowAge,
      statutoryHighAge,
      boarders,
      gender,
      admissionsPolicy,
      schoolCapacity,
      numberOfPupils,
      OfstedLastInsp,
      numberOfBoys,
      numberOfGirls,
      OfstedRating,
      Street,
      locality,
      address,
      town,
      postcode,
      county,
      region,
      schoolWebsite,
      telephoneNum,
      headTitle,
      headFirstName,
      headLastName,
      headPreferredJobTitle,
    });

    await newschool.save();
    res.status(201).send({ msg: "school added successfully" });
    try {
    } catch (error) {
      res.status(400).send({ msg: error });
    }
  },
  getSchool: async (req, res) => {
    try {
      const data = await Schoolmodel.find();
      if (data.length >= 1) {
        res.status(200).send({ msg: data });
      }
    } catch (err) {
      res.status(404).send({ msg: err });
    }
  },
  getByurn: async (req, res) => {
    try {
      const { urn } = req.params;
      const existschool = await Schoolmodel.findOne({ urn });
      if (!existschool) {
        return res.status(400).send({ msg: "school not exist" });
      }
      res.status(200).send({ msg: existschool });
    } catch (error) {
      return res.status(400).send({ msg: error });
    }
  },
  updateSchool: async (req, res) => {
    try {
      let { urn } = req.params;
      const data = req.body;
      if (!urn || !data) {
        return res.status(404).send({ msg: "provide urn" });
      }

      const existschool = await Schoolmodel.findOne({ urn });

      if (!existschool) {
        return res.status(400).send({ msg: "school not exist" });
      }

      await Schoolmodel.findByIdAndUpdate(existschool._id, data);
      res.status(200).send({ msg: "update successfull" });
    } catch (error) {
      res.status(404).send({ msg: err });
    }
  },
  deleteSchool: async (req, res) => {
    try {
      const { urn } = req.params;
      if (!urn) {
        return res.status(400).send({ msg: "please provide urn" });
      }
      const existschool = await Schoolmodel.findOne({ urn });

      if (!existschool) {
        return res.status(400).send({ msg: "school not exist" });
      }
      await Schoolmodel.findByIdAndDelete({ _id: existschool._id });
      res.status(200).send({ msg: "delete successfully" });
    } catch (error) {
      res.status(404).send({ msg: err });
    }
  },
};

module.exports = { schoolController };
