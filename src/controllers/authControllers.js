const { User } = require("../models");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const getUserByEmailMiddleWare = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({
      where: { email },
      attributes: { include: ['hashedPassword'] }
    });

    if (user) {
      req.user = user;
      next();
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const register = async (req, res) => {
  try {
    console.log("Received body:", req.body);
    const { email, password, firstname, lastname } = req.body;

    // Validation des champs requis
    if (!email || !password) {
      return res.status(400).json({ 
        error: "Email and password are required",
        received: req.body
      });
    }
    
    // Hash the password
    const hashedPassword = await argon2.hash(password);
    
    // Create user with hashed password
    const user = await User.create({
      email,
      hashedPassword,
      firstname,
      lastname
    });

    // Send back user data without the hashed password
    res.status(201).json({
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname
    });
  } catch (error) {
    console.error(error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.sendStatus(409); // Conflict - Email already exists
    } else {
      res.sendStatus(500);
    }
  }
};

const login = async (req, res) => {
  try {
    const { password } = req.body;
    const user = req.user;

    // Vérifier le mot de passe
    const isValid = await argon2.verify(user.hashedPassword, password);
    
    if (!isValid) {
      res.status(401).json({ error: "Invalid password" });
      return;
    }

    // Créer le token JWT
    const token = jwt.sign(
      { sub: user.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_TIMING }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname
      }
    });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = {
  getUserByEmailMiddleWare,
  register,
  login,
};
