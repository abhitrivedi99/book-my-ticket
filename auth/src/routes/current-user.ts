import jwt from 'jsonwebtoken'
import { Router, Request, Response } from 'express'
import { handleError, handleSuccess } from '../helper/response'

const router = Router()

router.get('/api/users/currentuser', (req: Request, res: Response) => {
	try {
		if (!req.session?.jwt) return handleError({ res, statusCode: 404, msg: 'User is not logged in', data: null })

		const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!)

		return handleSuccess({ res, statusCode: 200, data: payload, msg: 'User is logged in' })
	} catch (err) {
		console.error(err)
		return handleError({ res, statusCode: 404, msg: 'User is not logged in', data: null })
	}
})

export { router as currentUserRouter }
