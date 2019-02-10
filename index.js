const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(express.static('build'))
app.use(bodyParser.json())
app.use(morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      JSON.stringify(req.body)
    ].join(' ')
  }))

let persons = [
    {
        id: 1,
        name: 'Arto Hellas',
        number: '045-1236543'
    },
    {
        id: 2,
        name: 'Arto Järvinen',
        number: '041-21423123'
    },
    {
        id: 3,
        name: 'Lea Kutvonen',
        number: '040-4323234'
    },
    {
        id: 4,
        name: 'Martti Tienari',
        number: '09-784232'
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

generateId = () => {
    return Math.floor(Math.random() * Math.floor(1000000))
}
checkIfNameTaken = (name) => {
    const person = persons.find(person => person.name === name)
    return person
}

app.post('/api/persons', (req, res) => {
    const body = req.body

    if(!body.name || !body.number) {
        return res.status(400).json({error: 'content missing'})
    } else if (checkIfNameTaken(body.name)) {
        return res.status(400).json({error: 'name must be unique'})
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)
    console.log(persons)
    res.json(person)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if (person && person.number) {
        res.json(person.number)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

app.get('/info', (req, res) => {
    res.send(`<p>Puhelinluettelossa on ${persons.length} henkilön tiedot</p><p>${new Date().toLocaleString()}</p>`)
})

port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})