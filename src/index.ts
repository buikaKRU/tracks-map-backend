import express from 'express',
import connect from './database';
import morgan from 'morgan' // Node.js middleware for logging HTTP requests.
import formData from 'express-form-data'

import app from './server';



//https://blog.logrocket.com/typescript-with-node-js-and-express/
const PORT = 5000;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

//app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(formData.parse())
// union the body and the files
app.use(formData.union());


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



