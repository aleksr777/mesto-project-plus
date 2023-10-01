import { Request, Response } from 'express'
import user from '../models/userModel'

// Вернуть всех пользователей
export const getUsers = async ( _req: Request, res: Response ) => {
  try {
    const users = await user.find()
    res.json( users )
  } catch ( error ) {
    res.status( 500 ).json( { error: 'Ошибка обработки запроса к серверу.' } )
  }
}

// Вернуть пользователя по _id
export const getUserById = async ( req: Request, res: Response ) => {
  const userId = req.params.userId
  try {
    const userById = await user.findById( userId )
    if ( !userById ) {
      return res.status( 404 ).json( { error: 'Пользователь по указанному _id не найден.' } )
    }
    res.json( userById )
  } catch ( error ) {
    res.status( 500 ).json( { error: 'Ошибка обработки запроса к серверу.' } )
  }
}

// Создать пользователя
export const createUser = async ( req: Request, res: Response ) => {
  const { name, about, avatar } = req.body
  try {
    const newUser = await user.create( { name, about, avatar } )
    res.status( 201 ).json( newUser )
  } catch ( error ) {
    res.status( 400 ).json( { error: 'Переданы некорректные данные при создании пользователя. ' } )
  }
}

// Обновить профайл
export const updateUserProfile = async ( req: Request, res: Response ) => {
  const { name, about } = req.body
  try {
    const updatedUser = await user.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true }
    )
    if ( !updatedUser ) {
      return res.status( 404 ).json( { error: 'Пользователь с указанным _id не найден.' } )
    }
    res.json( updatedUser )
  } catch ( error ) {
    res.status( 500 ).json( { error: 'Ошибка обработки запроса к серверу.' } )
  }
}

// Обновить аватар
export const updateUserAvatar = async ( req: Request, res: Response ) => {
  const { avatar } = req.body
  try {
    const updatedUser = await user.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true }
    )
    if ( !updatedUser ) {
      return res.status( 404 ).json( { error: 'Пользователь с указанным _id не найден.' } )
    }
    res.json( updatedUser )
  } catch ( error ) {
    res.status( 500 ).json( { error: 'Ошибка обработки запроса к серверу.' } )
  }
}
