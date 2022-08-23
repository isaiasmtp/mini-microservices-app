const express = require('express')
const cors =  require('cors')

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json());   
app.use(cors())



const posts = {}

app.get('/posts', (req, res) => {
    res.status(200).send(posts)
})



app.post('/events', (req, res) => {
    const { type, data } = req.body;
    console.log('Event Received:', req.body.type);

    if( type === 'PostCreated' ){
        const { id, title } = data;
        posts[id] = { id, title, comments: [] }
    }

    if ( type === 'CommentCreated' ){
        const { id, content, postId } = data;

        const post = posts[postId];
        post.comments.push( { id, content })

    }

    res.status(201).send({ status: 'OK'})
})


app.listen('4002', () => {
    console.log('Running on port  4002');
})