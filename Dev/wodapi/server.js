const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { PORT, mongoUri } = require('./config.js')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const wodRoutes = require('./routes/api/wods')

app.use(cors());
app.use(morgan('tiny'))
app.use(bodyParser.json());

mongoose
    .connect(mongoUri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => console.log('Connected to mongoDB'))
    .catch((err) => console.log(err));

app.use('/api/wod', wodRoutes)
    //console.log(wodRoutes)
    //app.get('/', (req, res) => res.send('Hello World'))
app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`))