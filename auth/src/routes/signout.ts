import { Router } from 'express'

const router = Router()

router.post('/api/users/signout', (req, res) => {
	return res.send('Hi There')
})

export { router as signoutRouter }
