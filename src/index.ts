
import express from 'express';
import connect from './database';




connect();

//https://blog.logrocket.com/typescript-with-node-js-and-express/
const app = express();
const PORT = 8000;
app.get('/', (req, res) => res.send('Express + TypeScript Server'));
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
