import winston from 'winston'

const logger = winston.createLogger({
	level: 'info',
	format: winston.format.json(),
	transports: [
		new winston.transports.File({
			filename: './logs/all-logs.log',
			handleExceptions: true,
			maxsize: 5242880, // 5MB
			maxFiles: 5,
			options: {
				json: true,
				colorize: true,
			},
		}),
		new winston.transports.Console({
			handleExceptions: true,
		}),
	],
})

const stream = {
	write(message: string) {
		logger.info(message)
	},
}

export { logger, stream }
