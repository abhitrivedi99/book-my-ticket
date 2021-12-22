import { Router, Request, Response } from 'express'
import { handleSuccess } from '../helper/response'
import { logger } from '../helper/logger'

const router = Router()

router.post('/api/users/signout', (req: Request, res: Response) => {
	logger.info('Inside signout Controller')
	req.session = null
	return handleSuccess({ res, msg: 'logged out', statusCode: 200, data: {} })
})

export { router as signoutRouter }
