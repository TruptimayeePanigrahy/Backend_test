const { schoolmodel } = require("../models/schoolmodel");

const filtercontroller = {
  search: async (req, res) => {
    try {
      const { query, limit } = req.query;
      if (!query) {
        return res
          .status(400)
          .send({ msg: "Please provide a valid query parameter" });
      }
      const value = parseInt(query)
        ? {
            $search: {
              index: "establishmentName",
              text: {
                query: query,
                path: "urn",
              },
            },
          }
        : {
            $search: {
              index: "establishmentName",
              autocomplete: {
                query: query,
                path: "establishmentName",
                fuzzy: { maxEdits: 1, prefixLength: 1, maxExpansions: 50 },
              },
            },
          };
      if (!value) {
        return res.status(500).send({ msg: "Invalid value for search" });
      }

      const data = await schoolmodel.aggregate([
        value,
        { $limit: parseInt(limit) },
      ]);
      res.status(200).send({ msg: data });
    } catch (error) {
      console.log(error);
      res.status(500).send({ msg: error });
    }
  },

  filter: async (req, res) => {
    try {
      const { query } = req.query;

      const split = query.split(",");
      const data = await schoolmodel.aggregate([
        {
          $search: {
            index: "filter",
            phrase: {
              path: "OfstedRating",
              query: split,
            },
          },
        },
        { $limit: 1000 },
        {
          $project: {
            _id: 1,
            OfstedRating: 1,
          },
        },
      ]);
      console.log("data", data);
      res.send(data);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = { filtercontroller };
