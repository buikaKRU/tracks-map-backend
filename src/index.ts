
import connect from './database';
import app from './server';



//https://blog.logrocket.com/typescript-with-node-js-and-express/
const PORT = 5050;
connect().then(()=>{
  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
  })
}).catch((e) => {
  console.log(e)
})



