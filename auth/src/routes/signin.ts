import jwt from 'jsonwebtoken'
import { Router, Request, Response } from 'express'
import { signinValidator, validate } from '../middlewares/validator'
import { User } from '../models/user'
import { handleError, handleSuccess } from '../helper/response'
import { Password } from '../services/password'

const router = Router()

router.post('/api/users/signin', signinValidator(), validate, async (req: Request, res: Response) => {
	const { email, password } = req.body

	const existingUser = await User.findOne({email})
	// console.log(existingUser)

	if (!existingUser) {
		return handleError({ res, msg: 'Invalid credentials', statusCode: 400 })
	}

	const passwordMatch = await Password.compare(password, existingUser.password)

	if (!passwordMatch) {
		return handleError({ res, msg: 'Invalid credentials', statusCode: 400 })
	}

	// Generate JWT
	const userJwt = jwt.sign({ id: existingUser.id, email: existingUser.email }, process.env.JWT_KEY!)

	// Store it on object
	req.session = { ...req.session, jwt: userJwt }

	return handleSuccess({ res, msg: 'Sucess Signin', statusCode: 200, data: existingUser })
})

export { router as signinRouter }
