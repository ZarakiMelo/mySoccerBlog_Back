const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    // Récupérer le token du header Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.sendStatus(401);
    }

    const token = authHeader.split(" ")[1];
    // Vérifier et décoder le token
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    
    // Ajouter les informations décodées à la requête
    req.payloads = payload;
    
    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};

module.exports = {
  verifyToken,
}; 