import { Router, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/user'
import { signupValidator, validate } from '../middlewares/validator'
import { handleError, handleSuccess } from '../helper/response'
import { logger } from '../helper/logger'

const router = Router()

router.post('/api/users/signup', signupValidator(), validate, async (req: Request, res: Response) => {
	logger.info('Inside signup Controller')
	try {
		const { email, password } = req.body

		const existingUser = await User.findOne({ email })

		if (existingUser) {
			return handleError({ res, msg: 'User already exists', statusCode: 400, data: undefined })
		}

		const user = User.build({ email, password })
		await user.save()

		// Generate JWT
		const userJwt = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_KEY!)

		// Store it on object
		req.session = { ...req.session, jwt: userJwt }

		return handleSuccess({
			res,
			msg: 'Signup successfully',
			statusCode: 201,
			data: user,
		})
	} catch (err) {
		logger.debug(`${err}`)
		return handleError({ res, msg: 'Something went wrong', statusCode: 500, data: undefined })
	}
})

export { router as signupRouter }
