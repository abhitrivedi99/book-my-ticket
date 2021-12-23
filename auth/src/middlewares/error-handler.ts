// import { Request, Response, NextFunction } from 'express'
import { logger } from '../helper/logger'
// import { handleError } from '../helper/response'
// import { CustomError } from '../errors/custom-error'
// import { ServerError } from '../errors/server-error'

// export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
// 	logger.info('Inside errorHandler Middleware')

// 	if (err instanceof CustomError) {
// 		logger.debug(`${err}`)

// 		return handleError({ res, statusCode: err.statusCode, msg: 'Found Error', data: err.serializeErrors() })
// 	}

// 	throw new ServerError()
// }

import { Request, Response, NextFunction } from 'express'
import { CustomError } from '../errors/custom-error'

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
	logger.info('Inside errorHandler Middleware')
	if (err instanceof CustomError) {
		console.log(err)
		return res.status(err.statusCode).send({ errors: err.serializeErrors() })
	}

	res.status(400).send({
		errors: [{ message: 'Something went wrong' }],
	})
}
