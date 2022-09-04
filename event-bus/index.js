const express = require('express')
const axios = require('axios')
const cors =  require('cors')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json());   
app.use(cors())

const events = []

app.post('/events', async (req, res) => {
    const event = req.body;
    events.push(event)

    console.log('Event Emitted: ', req.body.type);

    try {
        await axios.post('http://localhost:4000/events', event);
        await axios.post('http://localhost:4001/events', event);
        await axios.post('http://localhost:4002/events', event);
        await axios.post('http://localhost:4003/events', event);
    } catch (err) {
        console.log(err.message);
    }

    res.send({ status: 'OK' })
})

app.get('/events', (req, res) => {
    res.send(events);
})


const port = 4005
app.listen(port, ()=> {
    console.log(`listening on port ${port}`);
})