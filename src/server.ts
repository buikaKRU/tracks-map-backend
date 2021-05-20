import Express from 'express';
import cors from 'cors';
import tracks from './controllers/track';



const app = Express();

app.use(Express.json());
app.use(cors());
app.get('/', (req, res) => res.send('Express + TypeScript Server'));
app.use('/api/v1/tracks', tracks);

export default app;
