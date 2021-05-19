
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

console.log('env', env.DB_CONNECTION)

const connect = async () => {
  const mongoConnectionString = `${env.DB_CONNECTION}:${env.DB_PORT}/`;
  try {
    const opts = {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    };
    await mongoose.connect(mongoConnectionString, opts);
    console.log(
      chalk.green(`🤘 Connected to the [${process.env.NODE_ENV}] database on port ${env.DB_PORT}`)
    );
  } catch (err) {
    console.log(chalk.red('Problem with connecting to the database'));
  }
};

export default connect;