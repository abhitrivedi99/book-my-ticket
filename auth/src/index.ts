import express, { json } from 'express'
import mongoose from 'mongoose'
import cookieSession from 'cookie-session'
import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'

const app = express()

app.set('trust proxy', true)
app.use(json())
app.use(
	cookieSession({
		signed: false,
		secure: true,
	}),
)

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.get('*', () => {
	throw new Error('Path does not exist on server')
})

const start = async () => {
	try {
		await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
	} catch (err) {
		console.error(err)
	}

	app.listen(3000, () => console.log('Listening on port 3000'))
}

start()
