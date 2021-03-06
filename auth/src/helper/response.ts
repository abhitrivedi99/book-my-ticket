import { Response } from 'express'

const handleSuccess = ({
	res,
	statusCode = 200,
	msg,
	data = null,
}: {
	res: Response
	msg: string
	data: any
	statusCode: number
}): Response => {
	return res.status(statusCode).send({ status: 'Success', msg, data })
}

const handleError = ({
	res,
	statusCode = 500,
	msg = 'Error',
	data = undefined,
}: {
	res: Response
	statusCode: number
	msg: string
	data: any
}): Response => {
	return res.status(statusCode).send({ status: 'Error', msg, data })
}

export { handleError, handleSuccess }
