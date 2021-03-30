'use strict';

// libraries
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('connected to the database');
});

// server initialization
const app = express();

// opens up server
app.use(cors());

// require


// PORT
const PORT = process.env.PORT || 3002;

// routes

// turn on server
app.listen(PORT, () => console.log(`listening on ${PORT}`));