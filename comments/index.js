const express = require('express')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const cors =  require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const commentsByPostId = {}

app.get('/post/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || [])
})

app.post('/post/:id/comments', (req, res) => {
    const id = randomBytes(4).toString('hex')
    const { content } = req.body

    if(content){

        comments = commentsByPostId[req.params.id] || []
        comments.push({ id: id, content: content })
        commentsByPostId[req.params.id] = comments

        res.status(201).send(comments)
    } else {
        res.status(400).send({"error": "Bad Request"})
    }
})

const port = '4001' 
app.listen(port, () => {
    console.log(`Running on port ${port}`);
})