import bcrypt from 'bcrypt'

const saltRounds = 10
export class Password {
	static async toHash(password: string) {
		const hash = await bcrypt.hash(password, saltRounds)
		if (!hash) throw new Error('Error hashing password')

		return hash
	}

	static async compare(storedPassword: string, supliedPassword: string) {
		return await bcrypt.compare(storedPassword, supliedPassword)
	}
}
