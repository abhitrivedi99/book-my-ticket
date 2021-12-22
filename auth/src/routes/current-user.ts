import { Router } from 'express'

const router = Router()

router.get('/api/users/currentuser', (req, res) => {
	return res.send('Hi There')
})

export { router as currentUserRouter }
