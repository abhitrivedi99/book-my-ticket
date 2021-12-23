import { ValidationError } from 'express-validator'
import { CustomError } from './custom-error'

export class RequestValidationError extends CustomError {
	statusCode = 422

	constructor(private errors: ValidationError[]) {
		super('Invalid Paramteres')

		// Only when extending a built in class
		Object.setPrototypeOf(this, RequestValidationError.prototype)
	}

	serializeErrors() {
		return this.errors.map((e) => {
			return { message: e.msg, field: e.param }
		})
	}
}
