const { Article, User } = require("../models");

const browse = async (req, res) => {
  try {
    const articles = await Article.findAll({
      include: [User]
    });
    res.json(articles);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const read = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id, {
      include: [User]
    });
    if (!article) {
      res.sendStatus(404);
    } else {
      res.json(article);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const edit = async (req, res) => {
  try {
    const [updated] = await Article.update(req.body, {
      where: { id: req.params.id }
    });
    if (!updated) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const add = async (req, res) => {
  try {
    const article = await Article.create({
      ...req.body,
      UserId: req.payloads.sub
    });
    res.status(201).json(article);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const destroy = async (req, res) => {
  try {
    const deleted = await Article.destroy({
      where: { id: req.params.id }
    });
    if (!deleted) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
