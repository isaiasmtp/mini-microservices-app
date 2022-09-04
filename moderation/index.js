const express = require('express')
const axios = require('axios')

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json());   



app.post('/events', async (req, res) => {
    const { type, data } = req.body;
    console.log('Event Received:', req.body.type);

    if ( type === 'CommentCreated' ){
        const status = data.content.includes('orange') ? 'rejected' : 'approved';

        await axios.post('http://localhost:4005/events', {
            type: 'CommentModerated',
            data: { 
                id: data.id,
                postId: data.postId,
                status,
                content: data.content
            }
        })

    }

    res.status(201).send({ status: 'OK'})
})


app.listen('4003', () => {
    console.log('Running on port  4003');
})