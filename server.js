const express = require('express')
const cors = require('cors')
const next = require('next')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const router = require('./server/routes/router')
require('dotenv').config()

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
require('./server/db/connection')

app.prepare().then(() => {
  const app = express()
  
  app.use(cors())
  app.use(cookieParser())
  app.use(express.json())
  app.use(morgan('dev'))
  app.use(router)

  app.all('*', (req, res) => {
    return handle(req, res)
  })

  app.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
