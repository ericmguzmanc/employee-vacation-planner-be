require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors');

const initializeDatabase = require('./app/db/index.js')
const config = require('./app/config/config')
const appRoutes = require('./app/routes')



app.set('superSecret', config.secret) // Secret variable

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// allow cors
app.use(cors());

// log requests to the console
app.use(morgan('dev'))

// Routes
app.use(appRoutes);


const startServer = async () => {
  await initializeDatabase(app)
  const port = process.env.PORT || 3008
  app.listen(port, console.log('\x1b[33m%s\x1b[0m', `Listening at http://localhost:${port}`))
}

startServer()

module.exports = app