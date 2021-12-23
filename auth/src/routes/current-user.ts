import jwt from 'jsonwebtoken'
import { Router, Request, Response } from 'express'
import { handleError } from '../helper/response'
import { logger } from '../helper/logger'
import { currentUser } from '../middlewares/current-user'

const router = Router()

router.get('/api/users/currentuser', currentUser, (req: Request, res: Response) => {
	logger.info('Inside currentuser Controller')
	try {
		return res.send({ user: req.user })
	} catch (err) {
		logger.debug(`${err}`)
		return handleError({ res, msg: 'Something went wrong', statusCode: 500, data: undefined })
	}
})

export { router as currentUserRouter }
