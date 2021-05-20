
import bodyParser, { urlencoded } from 'body-parser';
import connect from './database';
import morgan from 'morgan' // Node.js middleware for logging HTTP requests.

import app from './server';



//https://blog.logrocket.com/typescript-with-node-js-and-express/
const PORT = 5000;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

//app.use(morgan('dev'));

app.use(urlencoded({extended: true}))


connect().then(()=>{

  setTimeout(()=>{
    app.listen(PORT, () => {
      //npx kill-port 5000
      //pkill node
      //pkill nodejs
      console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
    })
  }, 1000)
}).catch((e) => {
  console.log(e);


})



