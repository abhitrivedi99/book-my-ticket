import { Router, Request, Response } from 'express'
import { handleSuccess } from '../helper/response'
import { logger } from '../helper/logger'
import { currentUser } from '../middlewares/current-user'
import { requireAuth } from '../middlewares/require-auth'
import { ServerError } from '../errors/server-error'

const router = Router()

router.get('/api/users/currentuser', currentUser, (req: Request, res: Response) => {
	logger.info('Inside currentuser Controller')
	try {
		return handleSuccess({ res, data: req.user, msg: 'user data', statusCode: 200 })
	} catch (err) {
		logger.debug(`${err}`)
		throw new ServerError()
	}
})

export { router as currentUserRouter }
