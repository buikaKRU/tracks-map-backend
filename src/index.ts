
import Express from 'express';
import connect from './database';
import app from './server';

connect();

//const app = Express();

//https://blog.logrocket.com/typescript-with-node-js-and-express/

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});



