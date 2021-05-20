
const chalk = require('chalk');

import mongoose from 'mongoose'
import dotenv from 'dotenv'

const envFiles = {
  development: '.env',
  test: '.env.test',
};

dotenv.config({
  //@ts-ignore
  path: envFiles[process?.env?.NODE_ENV],
});

//@ts-ignore
const env = dotenv.parsed || process.env;

const connect = async () => {
  const mongoConnectionString = `mongodb://${env.DB_USER}:${env.DB_PASS}@${env.DB_URI}:${env.DB_PORT}/data?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false`
  //console.log(mongoConnectionString);
  

  try {
    const opts = {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    };
    await mongoose.connect(mongoConnectionString, opts);
    console.log(
      chalk.green(`[database] 🤘 Connected to the "${process.env.NODE_ENV}" database on port ${env.DB_PORT}`)
      );
  } catch (err) {
    console.log(chalk.red('[database] Problem with connecting to the database'));
    console.log(err)
  };
};

export default connect;