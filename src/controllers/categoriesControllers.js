const { Category } = require("../models");

const browse = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const read = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      res.sendStatus(404);
    } else {
      res.json(category);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = {
  browse,
  read,
};
