
import connect from './database';
import app from './server';




//https://blog.logrocket.com/typescript-with-node-js-and-express/

const PORT = 5000;
connect();
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});



