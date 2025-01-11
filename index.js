/** @format */
const express = require('express');
const app = express();
require('dotenv').config();

const Person = require('./models/person');

app.use(express.static('dist'));

const morgan = require('morgan');

morgan.token('data', function (request, response) {
  return JSON.stringify(request.body);
});

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :data'),
);

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.get('/info', (request, response, next) => {
  const date = new Date();

  Person.countDocuments({})
    .then((personCount) => {
      response.send(`
      <div>
        <p>Phonebook has info for ${personCount} people</p>
        <p>${date}</p>
      </div>`);
    })
    .catch((error) => next(error));
});

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then((persons) => {
      response.json(persons);
    })
    .catch((error) => next(error));
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        person.deleteOne().then(() => {
          response.status(204).end();
        });
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.post('/api/persons', (request, response, next) => {
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

    newPerson
      .save()
      .then((savedPerson) => {
        response.json(savedPerson);
      })
      .catch((error) => next(error));
  });
});

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body;

  const updatedPerson = {
    name,
    number,
  };

  Person.findByIdAndUpdate(request.params.id, updatedPerson, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedPerson) => {
      if (updatedPerson) {
        response.json(updatedPerson);
      }
    })
    .catch((error) => next(error));
});

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
