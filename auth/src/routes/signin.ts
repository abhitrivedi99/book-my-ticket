import jwt from 'jsonwebtoken'
import { Router, Request, Response } from 'express'
import { signinValidator, validate } from '../middlewares/validator'
import { User } from '../models/user'
import { handleSuccess, handleError } from '../helper/response'
import { Password } from '../services/password'
import { logger } from '../helper/logger'
import { BadRequestError } from '../errors/bad-request-error'
import { ServerError } from '../errors/server-error'
import { errorHandler } from '../middlewares/error-handler'

const router = Router()

router.post('/api/users/signin', signinValidator(), validate, async (req: Request, res: Response) => {
	logger.info('Inside signin Controller')

	const { email, password } = req.body

	const existingUser = await User.findOne({ email })

	if (!existingUser) {
		throw new BadRequestError('Invalid Credentials')
	}

	const passwordMatch = await Password.compare(password, existingUser.password)

	if (!passwordMatch) {
		throw new BadRequestError('Invalid Credentials')
	}

	// Generate JWT
	const userJwt = jwt.sign({ id: existingUser.id, email: existingUser.email }, process.env.JWT_KEY!)

	// Store it on object
	req.session = { ...req.session, jwt: userJwt }

	return handleSuccess({ res, msg: 'Sucess Signin', statusCode: 200, data: existingUser })
})

export { router as signinRouter }
