const express = require('express')
const cors =  require('cors')
const axios = require('axios')

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json());   
app.use(cors())

const posts = {}

const handleEvent = (type, data) => {
    if( type === 'PostCreated' ){
        const { id, title } = data;
        posts[id] = { id, title, comments: [] }
    }

    if ( type === 'CommentCreated' ){
        const { id, content, postId, status } = data;

        const post = posts[postId];
        post.comments.push( { id, content, status })
    }

    if(type === 'CommentUpdated') {
        const { postId, id, status, content } = data;
        const post = posts[postId]
        
        const comment = post.comments.find(comment => {
            return comment.id === id;
        })

        comment.status = status;
        comment.content = content;
    }
}

app.get('/posts', (req, res) => {
    res.status(200).send(posts)
})




app.post('/events', async (req, res) => {
    const { type, data } = req.body;
    console.log('Event Received:', req.body.type);

    handleEvent(type, data)
    
    res.send({})
})


app.listen('4002', async () => {
    console.log('Running on port  4002');

    try {
        const res = await axios.get('http://localhost:4005/events')

        for (let event of res.data) {
            console.log('Processing event:', event.type);
            handleEvent(event.type, event.data);
        }
    } catch (err){
        console.log(err.message);
    }
})