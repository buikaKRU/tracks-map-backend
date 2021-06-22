import Express from 'express';
import cors from 'cors';
import tracks from './controllers/track';
import feature from './controllers/feature';
import library from './controllers/library';



const app = Express();

app.use(Express.json());
app.use(cors());
app.get('/', (req, res) => res.send('Express + TypeScript Server'));
app.use('/api/v1/tracks', tracks);
app.use('/api/v1/features', feature)
// app.use('/api/v1/library', library);

export default app;
