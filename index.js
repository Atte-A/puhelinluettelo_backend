/** @format */
const express = require('express');
const app = express();
require('dotenv').config();

const morgan = require('morgan');
const cors = require('cors');
// const mongoose = require('mongoose')
const Person = require('./models/person');

morgan.token('data', function (request, response) {
  return JSON.stringify(request.body);
});

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :data'),
);

// const personSchema = new mongoose.Schema({
//   name: String,
//   number: String,
// });

// personSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   },
// });

app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

app.get('/info', (request, response) => {
  const date = new Date();

  Person.countDocuments({}).then((personCount) => {
    response.send(`
      <div>
        <p>Phonebook has info for ${personCount} people</p>
        <p>${date}</p>
      </div>`);
  });
});

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then((person) => {
    if (person) {
      response.json(person);
    } else {
      response.status(404).end();
    }
  });
});

app.delete('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then((person) => {
    if (person) {
      person.deleteOne().then(() => {
        response.status(204).end();
      });
    } else {
      response.status(404).end();
    }
  });
});

app.post('/api/persons', (request, response) => {
  const { name, number } = request.body;

  if (!name || !number) {
    return response.status(400).json({ error: 'name and number are required' });
  }

  Person.findOne({ name }).then((personAlreadyExists) => {
    if (personAlreadyExists) {
      return response.status(400).json({ error: 'name must be unique' });
    }

    const newPerson = new Person({
      name,
      number,
    });

    newPerson.save().then((savedPerson) => {
      response.json(savedPerson);
    });
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Sovellus toimii ja käyttää MongoDB localhost:3001. PItäisikö toimia Renderin kautta?? Tsekkaa miten notebook on hoidettu..
