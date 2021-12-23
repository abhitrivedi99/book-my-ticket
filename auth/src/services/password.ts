import bcrypt from 'bcrypt'
import { logger } from '../helper/logger'

const saltRounds = 10
export class Password {
	static async toHash(password: string) {
		logger.info('Inside toHash Function')
		const hash = await bcrypt.hash(password, saltRounds)
		if (!hash) throw new Error('Error hashing password')

		return hash
	}

	static async compare(storedPassword: string, supliedPassword: string) {
		logger.info('Inside compare Function')
		return await bcrypt.compare(storedPassword, supliedPassword)
	}
}
