import { Request, Response, Router } from 'express'
import { getUsers, getUserById, createUser, updateUserProfile, updateUserAvatar } from '../controllers/userController'
import { getAllCards, createCard, deleteCard, likeCard, dislikeCard, } from '../controllers/cardController'

const router = Router()

router.get( '/', ( _req: Request, res: Response ) => { res.send( 'Hello, World!' ) } )
router.get( '/users', getUsers ) // Получить всех пользователей
router.get( '/users/:userId', getUserById ) // Получить пользователя по _id
router.post( '/users', createUser ) // Создать пользователя
router.patch( '/users/me', updateUserProfile ) // Обновить профайл
router.patch( '/users/me/avatar', updateUserAvatar ) // Обновить аватар
router.get( '/cards', getAllCards ) // Получение всех карточек
router.post( '/cards', createCard ) // Создание карточки
router.delete( '/cards/:cardId', deleteCard ) // Удаление карточки по идентификатору
router.put( '/cards/:cardId/likes', likeCard ) //Добавить лайк карточке
router.delete( '/cards/:cardId/likes', dislikeCard ) // Удалить лайк

export default router
