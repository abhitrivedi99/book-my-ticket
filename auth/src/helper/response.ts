import { Response } from 'express'

const handleSuccess = ({
	res,
	statusCode = 200,
	msg,
	data = {},
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
}: {
	res: Response
	statusCode: number
	msg: string
}): Response => {
	return res.status(statusCode).send({ status: 'Error', msg })
}

export { handleError, handleSuccess }
