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

// [ PUT ] endpoints

// [ DELETE ] endpoints

// [ CATCH ] endpoint
server.all('*', (req, res) => {
    res.status(404).json({ message: 'Sorry, the page you were looking for could not be found' })
})

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

