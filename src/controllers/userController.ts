// controllers/userController.ts
import { Request, Response } from 'express'
import user from '../models/userModel' // Подключаем модель пользователя

// Обработка GET /users - возвращает всех пользователей
export const getUsers = async ( _req: Request, res: Response ) => {
  try {
    const users = await user.find() // Извлекаем всех пользователей из базы данных
    res.json( users )
  } catch ( error ) {
    res.status( 500 ).json( { error: 'An error occurred while fetching users' } )
  }
}

// Обработка GET /users/:userId - возвращает пользователя по _id
export const getUserById = async ( req: Request, res: Response ) => {
  const userId = req.params.userId
  try {
    const userById = await user.findById( userId ) // Извлекаем пользователя по _id из базы данных
    if ( !userById ) {
      return res.status( 404 ).json( { error: 'User not found' } )
    }
    res.json( userById )
  } catch ( error ) {
    res.status( 500 ).json( { error: 'An error occurred while fetching the user' } )
  }
}

// Обработка POST /users - создает пользователя
export const createUser = async ( req: Request, res: Response ) => {
  const { name, about, avatar } = req.body
  try {
    const newUser = await user.create( { name, about, avatar } ) // Создаем нового пользователя
    res.status( 201 ).json( newUser )
  } catch ( error ) {
    res.status( 400 ).json( { error: 'Invalid user data' } )
  }
}
