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
app.use(express.json());

// require
const User = require('./Models/User');

// PORT
const PORT = process.env.PORT || 3002;

const jacob = new User ({
  email: 'yacub90@gmail.com',
  books: [
    {name: 'The Alchemist',description: 'Book about a boy who finds his true calling.',status: 'read'}, 
    {name: 'The Way Of The Peaceful Warrior', description: 'A story about living in the present moment.', status: 'read'},
    {name: 'The Bhagavad Gita', description: 'Hope you can read sanskrit', status: 'read'}
  ]
})
jacob.save();
console.log(jacob.books);

const simone = new User ({
  email: 'team.steele@gmail.com',
  books: [
    {name: 'Holes', description: 'A book about diggin holes and findin freedom', status: 'read'},
    {name: 'Gossip Girl', description: 'Hey uppereast siders, this is about the scandals of the elite of Manhattan.', status: 'read'},
    {name: 'Demon Slayer Manga', description: 'This is about a Demon Slayer', status: 'read'}
  ]
})
simone.save();
console.log('jfdoafjdsoiajfoajdsoa', simone.books);

// routes
// proof of life
app.get('/', function(request, response){
  response.send('Hello World');
})
app.get('/books', getAllBooks);
app.post('/books', createABook);
app.delete('/books/:index', deleteABook);


async function getAllBooks(request, response){
  const email = request.query.email;
  console.log('jk',{email})
  await User.find({email: email}, function (err, items) {
    if (err) return console.error(err);
    console.log('hi everyone', items[items.length-1])
    response.status(200).send(items[items.length-1].books);
  })
  // console.log(email)
}

async function createABook(request, response){
  console.log('inside of create a book with request.body', request.body);
  const email = request.body.email;
  const book = {name: request.body.name, description: request.body.desciption, status: request.body.status};

  await User.findOne({ email }, (err, entry)=> {
    if (err) return console.error(err);
    entry.books.push(books);
    entry.save();
    response.status(200).send(entry.books);
  })
}

async function deleteABook(request, response){
  const index = request.params.index;
  const userEmail = request.query.email;

  User.findOne({ email: userEmail }, (err, entry)=>{
    const newBookArray = entry.books.filter((book, i)=>{
      return i !== index;
    });
    entry.books = newBookArray;
    entry.save();
    response.status(200).send('success');
  })
}
// turn on server
app.listen(PORT, () => console.log(`listening on ${PORT}`));