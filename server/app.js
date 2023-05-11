const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const usersRouter = require('./routes/users.js');
const employeesRouter = require('./routes/employees.js');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

app.use('/api/user', usersRouter);
app.use('/api/employees', employeesRouter);

module.exports = app;
