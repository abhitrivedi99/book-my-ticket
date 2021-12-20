import { Router, Request, Response } from 'express'
import { signupValidator, validate } from '../middlewares/validator'

const router = Router()

router.post('/api/users/signup', signupValidator(), validate, (req: Request, res: Response) => {
	const { email, password } = req.body

	return res.send(req.body)
})

export { router as signupRouter }
