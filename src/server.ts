import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

// const movies = require('./controllers/movies');

// app.use('/api/v1/tracks', movies);

export default app;