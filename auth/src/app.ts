import express, { json } from 'express'
import 'express-async-errors'
import morgan from 'morgan'
import cookieSession from 'cookie-session'
import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'
import { NotFoundError } from './errors/not-found-error'
import { errorHandler } from './middlewares/error-handler'

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

app.all('*', () => {
	throw new NotFoundError()
})

app.use(errorHandler)

export { app }
