const express = require('express')
const axios = require('axios')
const cors =  require('cors')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json());   
app.use(cors())


app.post('/events', async (req, res) => {
    const event = req.body;
    console.log('Event Emitted: ', req.body.type);

    await axios.post('http://localhost:4000/events', event);
    await axios.post('http://localhost:4001/events', event);
    await axios.post('http://localhost:4002/events', event);

    res.send({ status: 'OK' })
})


const port = 4005
app.listen(port, ()=> {
    console.log(`listening on port ${port}`);
})