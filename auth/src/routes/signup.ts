import { Router, Request, Response } from 'express'
import { User } from '../models/user'
import { signupValidator, validate } from '../middlewares/validator'
import { handleError, handleSuccess } from '../helper/response'

const router = Router()

router.post('/api/users/signup', signupValidator(), validate, async (req: Request, res: Response) => {
	const { email, password } = req.body

	const existingUser = await User.findOne({ email })

	if (existingUser) {
		return handleError({ res, msg: 'User already exists', statusCode: 400 })
	}

	const user = User.build({ email, password })
	await user.save()

	return handleSuccess({ res, msg: 'Signup successfully', statusCode: 201, data: user })
})

export { router as signupRouter }
