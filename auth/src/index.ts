import mongoose from 'mongoose'
import { logger } from './helper/logger'
import { app } from './app'

const start = async () => {
	logger.info('Inside start Service')
	if (!process.env.JWT_KEY) {
		throw new Error('JWT must be defined in environment')
	}

	try {
		await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
		logger.info('Connected to mongo')
	} catch (err) {
		logger.debug(`${err}`)
	}

	app.listen(3000, () => logger.info('Listening on port 3000'))
}

start()
