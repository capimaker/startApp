const Mentor = require("../models/Mentors.js");

const MentorsController = {
  async getAll(req, res) {
    try {
      const mentors = await Mentor.find({}, 
        "business_name img_business category avaiable_dates linkedin business_link extra_info"
      );
      res.send(mentors);
    } catch (error) {
      res.status(500).send({ msg: "Error al obtener los mentores", error });
    }
  },
};

module.exports = MentorsController;

