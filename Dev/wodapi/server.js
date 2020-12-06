const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { PORT, mongoUri } = require('./config.js')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const wodRoutes = require('./routes/api/wods')
const path = require('path')

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

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
    })
}

app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`))