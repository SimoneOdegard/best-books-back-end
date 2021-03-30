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
const User = require('./Models/User');

// PORT
const PORT = process.env.PORT || 3002;

const jacob = new User ({
  email: 'yacub90@gmail.com',
  books: [
    [{name: 'The Alchemist'}, {description: 'Book about a boy who finds his true calling.'}, {status: 'read'}], 
    [{name: 'The Way Of The Peaceful Warrior'}, {description: 'A story about living in the present moment.'}, {status: 'read'}],
    [{name: 'The Bhagavad Gita'}, {description: 'Hope you can read sanskrit'}, {status: 'read'}]
  ]
})
jacob.save();

const simone = new User ({
  email: 'team.steele@gmail.com',
  books: [
    [{name: 'Holes'}, {description: 'A book about diggin holes and findin freedom'}, {status: 'read'}],
    [{name: 'Gossip Girl'}, {description: 'Hey uppereast siders, this is about the scandals of the elite of Manhattan.'}, {status: 'read'}],
    [{name: 'Demon Slayer Manga'}, {description: 'This is about a Demon Slayer'}, {status: 'read'}]
  ]
})
simone.save();


// routes
// proof of life
app.get('/', function(request, response){
  response.send('Hello World');
})
app.get('/books', getAllBooks)

async function getAllBooks(request, response){
  const email = request.query.email;
  console.log({email})
  await User.find({email: email}, function (err, items) {
    if (err) return console.error(err);
    console.log(items, items[0])
    response.status(200).send(items[0].books);
  })
}

// turn on server
app.listen(PORT, () => console.log(`listening on ${PORT}`));