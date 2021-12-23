import express, { json } from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import cookieSession from 'cookie-session'
import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'
import { logger } from './helper/logger'

const app = express()

app.set('trust proxy', true)
app.use(json())
app.use(morgan('dev'))
app.use(
	cookieSession({
		signed: false,
		secure: true,
	})
)

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.get('*', () => {
	throw new Error('Path does not exist on server')
})

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
