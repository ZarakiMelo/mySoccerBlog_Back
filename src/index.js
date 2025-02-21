const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://my-soccer-blog-front.vercel.app',
    'https://my-soccer-blog-front-git-main-zarakimelo.vercel.app',
    'https://my-soccer-blog-front-zarakimelo.vercel.app' 
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400 
}));


const routes = require('./routers');
app.use(routes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});

module.exports = app;

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.APP_PORT || 5050;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} 