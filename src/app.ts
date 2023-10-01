import express, { Request, Response, NextFunction } from 'express'
import router from './routes/routes'
import mongoose from 'mongoose'

const { PORT = 3000 } = process.env
const app = express()
app.use( express.json() )

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

// Объявляем пользовательский тип для объекта user
declare global {
  namespace Express {
    interface Request {
      user: {
        _id: string
      }
    }
  }
}

// Временный мидлвар для авторизации
app.use( ( req: Request, res: Response, next: NextFunction ) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133' // Здесь нужно будет использовать настоящий идентификатор пользователя
  }

  next()
} )

app.use( '/', router )

app.listen( +PORT, () => {
  console.log( `Server is running at http://localhost:${PORT}` )
} )
