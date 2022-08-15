const express = require('express')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')

const app = express()
app.use(bodyParser.json())

const posts = {}

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex')
    const { title } = req.body

    if(title){
        posts[id] = { id, title}
        res.status(201).send(posts[id])
    } else {
        res.status(400).send({"error": "Bad Request"})
    }


})

app.listen('4000', () => {
    console.log('Running on port 4000');
})