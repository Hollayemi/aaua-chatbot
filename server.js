require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db')
connectDB()
const apiPrefix = "/api/v1"
const auth = require('./Routes/auth');
const chat = require('./Routes/chat')

const app = express();
app.use(cors());
app.use(express.json());

app.use(`${apiPrefix}/ictac-bot`, auth);
app.use(`${apiPrefix}/ictac-bot`, chat);


// Website widget route
app.get('/website', async (req, res) => {

    let text = req.query.text;
    let sessionId = req.query.mysession;

    console.log('A request came.');
    console.log(`Query text --> ${text}`);
    console.log(`Session id --> ${sessionId}`);

    let intentData = await DIALOGFLOW_API.detectIntent('en', text, sessionId);

    res.setHeader('Access-Control-Allow-Origin', '*');

    if (intentData.status == 1) {
        res.send(intentData.text);
    } else {
        res.send('Chatbot is having problem. Try again after sometime.');
    }
});



app.listen(process.env.PORT || 3030, () => {
    console.log(`server running at port ${process.env.PORT}`);
});

