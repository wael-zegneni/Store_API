require('dotenv').config()
require('express-async-errors')
//async error

const express = require('express')
const app = express()

const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

// middleware 
app.use(express.json())

// routes
app.get('/', (req, res) => {
  res.send('<h1>Store API</h1> <a href="/api/v1/products">Product</a>')
})

app.use('/api/v1/products', productsRouter)


// products route
app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port =  process.env.port || 3000


const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, (req, res) => {
      console.log(`app listening on port ${port}`)}
    )
  } catch (error) {
    
  }
}

start()