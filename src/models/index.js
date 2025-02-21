const { Sequelize, DataTypes } = require("sequelize");

// Initialiser Sequelize avec SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite", // Le fichier de base de données sera créé ici
  logging: false // Désactive les logs SQL
});

// Définir les modèles
const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  hashedPassword: {
    type: DataTypes.STRING,
    allowNull: false
  },
  firstname: DataTypes.STRING,
  lastname: DataTypes.STRING
});

const Article = sequelize.define("Article", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

const Category = sequelize.define("Category", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Définir les relations
User.hasMany(Article);
Article.belongsTo(User);

Category.hasMany(Article);
Article.belongsTo(Category);

// Synchroniser les modèles avec la base de données
const migrate = async () => {
  try {
    await sequelize.sync({ force: true }); // force: true va supprimer et recréer les tables

    // Créer des données de test
    const testUser = await User.create({
      email: "test@example.com",
      hashedPassword: "$argon2id$v=19$m=65536,t=5,p=1$6F4DFQiZB6NPqGvlQT9YrA$dU/gpZMY6q9BNXYNZHHAphwZi6EEuVJ8um5E6mZKwLQ", // mot de passe: "password123"
      firstname: "John",
      lastname: "Doe"
    });

    const testCategory = await Category.create({
      name: "Technology"
    });

    await Article.create({
      title: "Premier article",
      content: "Contenu du premier article",
      UserId: testUser.id,
      CategoryId: testCategory.id
    });

    console.log("Database synchronized and test data created");
  } catch (error) {
    console.error("Error synchronizing database:", error);
    throw error;
  }
};

module.exports = {
  sequelize,
  User,
  Article,
  Category,
  migrate
};
