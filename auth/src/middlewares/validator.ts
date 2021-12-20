import { body, validationResult, ValidationError } from 'express-validator'
import { Response, Request, NextFunction } from 'express'
import { handleError } from '../helper/response'

export const validate = (req: Request, res: Response, next: NextFunction): any => {
	const errorFormatter = ({ location, msg, param, value, nestedErrors }: ValidationError) => {
		// Build your resulting errors however you want! String, object, whatever - it works!
		return `${location}[${param}]: ${msg}`
	}
	const result = validationResult(req).formatWith(errorFormatter)
	console.log(result)

	if (!result.isEmpty()) return handleError({ res, statusCode: 422, msg: 'Validation failed' })

	return next()
}

export const signupValidator = () => {
	return [
		body('email').isEmail().withMessage('Email must be valid'),
		body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be between 4 and 20'),
	]
}
