import { Request, Response, Router } from 'express'

const router = Router()

export default router.get( '/', ( req: Request, res: Response ) => {
  res.send( 'Hello, World!' )
} )
