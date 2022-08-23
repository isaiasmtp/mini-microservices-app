const express = require('express')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const cors =  require('cors')
const axios = require('axios')


const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json()); 
app.use(cors())

const commentsByPostId = {}

app.get('/post/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || [])
})

app.post('/post/:id/comments', async (req, res) => {
    const id = randomBytes(4).toString('hex')
    const { content } = req.body
    const postId = req.params.id

    if(content){
        comments = commentsByPostId[postId] || []
        comments.push({ id: id, content: content })
        commentsByPostId[postId] = comments

        await axios.post('http://localhost:4005/events', {
            type: 'CommentCreated',
            data: { id, content, postId }
        })

        res.status(201).send(comments)
    } else {
        res.status(400).send({"error": "Bad Request"})
    }
})

app.post('/events', (req, res) => {
    console.log('Event Received:', req.body.type);
    res.status(201).send({ status: 'OK'})
})

const port = '4001' 
app.listen(port, () => {
    console.log(`Running on port ${port}`);
})