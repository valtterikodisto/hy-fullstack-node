// Front end can be found in https://github.com/valtterikodisto/hy-fullstack/tree/master/osa2/2.6-2.11%2B2.15-2.20

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}   
const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const morgan = require('morgan')
const Person = require('./models/person')

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
    Person.find({}).then(person => {
        res.json(person.map(person => person.toJSON()))
    });
})

// Not in use but since previous tasks required this method it wont be removed
generateId = () => {
    return Math.floor(Math.random() * Math.floor(1000000))
}
checkIfNameTaken = (name) => {
    const person = persons.find(person => person.name === name)
    return person
}

app.post('/api/persons', (req, res, next) => {
    const body = req.body

    // if (!body.name || !body.number) {
    //     return res.status(400).json({error: 'content missing'})
    // } else if (checkIfNameTaken(body.name)) {
    //     return res.status(400).json({error: 'name must be unique'})
    // }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save()
        .then(savedPerson => {
            console.log('person saved!');
            res.json(savedPerson.toJSON())
        })
        .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(person.toJSON())
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body
    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updatedPerson => {
            res.json(updatedPerson.toJSON())
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

app.get('/info', (req, res) => {
    res.send(`<p>Puhelinluettelossa on ${persons.length} henkilön tiedot</p><p>${new Date().toLocaleString()}</p>`)
})

PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

const unknownEndpoint = (req, res) => {
    return res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
    console.log(error.name)
    if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    }
    else if (error) {
        return res.status(400).send({error: 'malformatted data'})
    }
    next(error)
}

app.use(errorHandler)