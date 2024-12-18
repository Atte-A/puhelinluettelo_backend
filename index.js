/** @format */

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

morgan.token('data', function (request, response) {
  return JSON.stringify(request.body);
});

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :data'),
);

app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

let persons = [
  {
    id: '1',
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: '3',
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: '4',
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/info', (request, response) => {
  const date = new Date();
  const personCount = persons.length;

  response.send(`
    <div>
      <p>Phonebook has info for ${personCount} people</p>
      <p>${date}</p>
    </div>`);
});

app.get('/api/persons/:id/', (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete('/api/persons/:id/', (request, response) => {
  const id = request.params.id;
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

app.post('/api/persons/', (request, response) => {
  const newId = Math.floor(Math.random() * 1000);

  const newPerson = {
    ...request.body,
    id: newId,
  };

  const newPersonAlreadyExist = persons.find(
    (person) => person.name === newPerson.name,
  );

  if (!newPerson.name || !newPerson.number) {
    response.status(400).json({ error: 'name and number are required' });
  } else if (newPersonAlreadyExist) {
    response.status(400).json({ error: 'name must be unique' });
  } else {
    persons = persons.concat(newPerson);
    response.json(newPerson);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// tarkista proxy, tee npm run deploy:full ja korjaa ongelmat
