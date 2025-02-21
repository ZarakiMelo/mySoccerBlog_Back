const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'https://my-soccer-blog-front.vercel.app'],
  credentials: true
}));

const routes = require('./routers');
app.use(routes);

const PORT = process.env.APP_PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 