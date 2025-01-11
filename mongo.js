/** @format */

const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://atteampuja1:${password}@cluster0.dwuf3.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const peopleSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', peopleSchema)

const person = new Person({
  name: name,
  number: number,
})

if (process.argv.length > 3) {
  person.save().then((result) => {
    console.log(`Added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  })
}

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    console.log('phonebook:')
    result.forEach((result) => {
      console.log(result.name, result.number)
    })
    mongoose.connection.close()
  })
}
