//dependencies
const express = require('express')
const shortid = require('shortid')
const generate = require('shortid').generate

//initialize app
const server = express()
server.use(express.json())

//create a server port
const PORT = 5000

//data structure
let users = [
    { id: generate(), name: 'Josh', bio: 'Not a bad guy' }
]

//[ GET ] endpoints
server.get('/users', (req, res) => {
    try {
        res.status(200).json({ data: users })
    } catch(error) {
        res.status(500).json({ message: 'Failure fetching users', error })
    }
})

// [ POST ] endpoints
server.post('/users', (req, res) => {
    const { name, bio } = req.body
    try {
        if(!name || !bio) {
            res.status(400).json({ message: 'Request must include a name and a bio'})
        } else {
            const newUser = { id: generate(), name, bio }
            users.push(newUser)
            res.status(201).json({ message: 'New user created', data: users })
        }
    } catch(error) {
        res.status(500).json({ message: 'Failure adding user', error })
    }
})

// [ PUT ] endpoints
server.put('/users/:id', (req, res) => {
    try {
        const { id } = req.params
        const { name, bio } = req.body
        const index = users.findIndex(user => user.id === id)
        if(index !== -1 && name && bio) {
            users[index] = { id, name, bio }
            res.status(200).json({ message: 'User has been update', data: users })
        } else if (index === -1) {
            res.status(404).json({ message: `Could not find user with id ${id}` })
        } else if (!name || !bio) {
            res.status(400).json({ message: 'Request must include a name and a bio'})
        }
    } catch(error) {
        res.status(500).json({ message: 'Failure updating user', error })
    }
})

// [ DELETE ] endpoints

// [ CATCH ] endpoint
server.all('*', (req, res) => {
    res.status(404).json({ message: 'Sorry, the page you were looking for could not be found' })
})

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

