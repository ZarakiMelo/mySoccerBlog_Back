const express = require('express');
const cors = require('cors');

const app = express();


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