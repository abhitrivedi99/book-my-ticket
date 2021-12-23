import { body, validationResult } from 'express-validator'
import { Response, Request, NextFunction } from 'express'
import { logger } from '../helper/logger'
import { RequestValidationError } from '../errors/request-validation-error'

export const validate = (req: Request, res: Response, next: NextFunction): any => {
	logger.info('Inside validate Middleware')

	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		logger.debug(`${errors.array()}`)
		throw new RequestValidationError(errors.array())
	}

	return next()
}

export const signupValidator = () => {
	return [
		body('email').isEmail().withMessage('Email must be valid'),
		body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be between 4 and 20'),
	]
}

export const signinValidator = () => {
	return [
		body('email').isEmail().withMessage('Email must be valid'),
		body('password').trim().notEmpty().withMessage('Password must be valid'),
	]
}
