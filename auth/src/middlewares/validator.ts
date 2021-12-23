import { body, validationResult, ValidationError } from 'express-validator'
import { Response, Request, NextFunction } from 'express'
import { handleError } from '../helper/response'
import { logger } from '../helper/logger'

export const validate = (req: Request, res: Response, next: NextFunction): any => {
	logger.info('Inside validate Middleware')
	const errorFormatter = ({ location, msg, param, value, nestedErrors }: ValidationError) => {
		// Build your resulting errors however you want! String, object, whatever - it works!
		return `${location}[${param}]: ${msg}`
	}
	const result = validationResult(req).formatWith(errorFormatter)

	if (!result.isEmpty()) return handleError({ res, statusCode: 422, msg: 'Validation failed', data: undefined })

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
