import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { handleError } from '../helper/response'
import { logger } from '../helper/logger'

interface UserPayload {
	id: string
	email: string
	iat?: number
}

declare global {
	namespace Express {
		interface Request {
			user?: UserPayload
		}
	}
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
	logger.info('Inside currentUser Middleware')
	if (!req.session?.jwt) {
		return next()
	}

	try {
		const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload

		req.user = payload
		return next()
	} catch (err) {
		logger.debug(`${err}`)
		return handleError({ res, msg: 'Something went wrong', statusCode: 500, data: undefined })
	}
}
