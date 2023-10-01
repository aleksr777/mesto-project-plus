import { Request, Response } from 'express'
import card from '../models/cardModel'

// Вернуть все карточки
export const getAllCards = async ( _req: Request, res: Response ) => {
  try {
    const cards = await card.find()
    res.json( cards )
  } catch ( error ) {
    res.status( 500 ).json( { error: 'Ошибка обработки запроса к серверу.' } )
  }
}

// Создать новую карточку
export const createCard = async ( req: Request, res: Response ) => {
  const { name, link } = req.body
  try {
    const newCard = new card( {
      name,
      link,
      owner: req.user._id,
    } )
    const savedCard = await newCard.save()
    res.status( 201 ).json( savedCard )
  } catch ( error ) {
    res.status( 400 ).json( { error: 'Переданы некорректные данные при создании карточки.' } )
  }
}

// Вернуть карточку по _id
export const deleteCard = async ( req: Request, res: Response ) => {
  const { cardId } = req.params
  try {
    const deletedCard = await card.findByIdAndDelete( cardId )
    if ( !deletedCard ) {
      res.status( 404 ).json( { error: 'Карточка с указанным _id не найдена.' } )
    } else {
      res.json( deletedCard )
    }
  } catch ( error ) {
    res.status( 500 ).json( { error: 'Ошибка обработки запроса к серверу.' } )
  }
}

// Добавить лайк карточке
export const likeCard = async ( req: Request, res: Response ) => {
  try {
    const updatedCard = await card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )

    if ( !updatedCard ) {
      return res.status( 404 ).json( { error: 'Переданы некорректные данные для постановки лайка.' } )
    }

    res.json( updatedCard )
  } catch ( error ) {
    res.status( 500 ).json( { error: 'Ошибка обработки запроса к серверу.' } )
  }
}

// Удалить лайк у карточки
export const dislikeCard = async ( req: Request, res: Response ) => {
  try {
    const updatedCard = await card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )

    if ( !updatedCard ) {
      return res.status( 404 ).json( { error: 'Переданы некорректные данные для снятии лайка.' } )
    }

    res.json( updatedCard )
  } catch ( error ) {
    res.status( 500 ).json( { error: 'Ошибка обработки запроса к серверу.' } )
  }
}
