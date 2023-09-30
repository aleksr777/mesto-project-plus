import { Request, Response, Router } from 'express'
import { getUsers, getUserById, createUser } from '../controllers/userController'
const router = Router()

router.get( '/', ( _req: Request, res: Response ) => { res.send( 'Hello, World!' ) } )
router.get( '/users', getUsers ) // Получить всех пользователей
router.get( '/users/:userId', getUserById ) // Получить пользователя по _id
router.post( '/users', createUser ) // Создать пользователя

export default router
