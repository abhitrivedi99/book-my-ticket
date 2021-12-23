import { Response, Request, NextFunction } from 'express'
import { NotAuthorizedError } from '../errors/not-authorized-error'
import { logger } from '../helper/logger'

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
	logger.info('Inside requireAuth Middleware')
	if (!req.user) {
		throw new NotAuthorizedError()
	}

	next()
}
