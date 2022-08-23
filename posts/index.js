const express = require('express')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const cors =  require('cors')
const axios = require('axios')

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json());   

app.use(cors())

const posts = {}

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/posts', async (req, res) => {
    
    const id = randomBytes(4).toString('hex')
    const { title } = req.body

    if(title){
        posts[id] = { id, title}

        await axios.post('http://localhost:4005/events', {
            type: 'PostCreated',
            data: { id, title }
        })

        res.status(201).send(posts[id])
    } else {
        res.status(400).send({"error": "Bad Request"})
    }
})

app.post('/events', (req, res) => {
    console.log('Event Received: ', req.body.type);
    res.status(201).send({ status: 'OK'})
})


app.listen('4000', () => {
    console.log('Running on port  4000');
})