import express from 'express'
import router from './routes/routes'
import mongoose from 'mongoose'

const { PORT = 3000 } = process.env
const app = express()

// Подключение к MongoDB
mongoose.connect( 'mongodb://localhost:27017/mestodb' )

// Получаем объект подключения для прослушивания событий
const db = mongoose.connection

db.on( 'error', ( error ) => {
  console.error( 'Connection error:', error )
} )

db.once( 'open', () => {
  console.log( 'Connected to MongoDB successfully!' )
} )

db.on( 'disconnected', () => {
  console.log( 'Disconnected from MongoDB' )
} )

app.use( '/', router )

app.listen( +PORT, () => {
  console.log( `Server is running at http://localhost:${PORT}` )
} )
