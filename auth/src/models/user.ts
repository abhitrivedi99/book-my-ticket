import { Schema, Model, model, Document } from 'mongoose'
import { Password } from '../services/password'

// An iterface that describes the properties that are required to create a new user
interface UserAttrs {
	email: string
	password: string
}

// An interface that describes the properties that a user model has
interface UserModel extends Model<UserDoc> {
	build(attrs: UserAttrs): UserDoc
}

// An interface that describes the properties that a user document has
interface UserDoc extends Document {
	email: string
	password: string
	createdAt: string
	updatedAt: string
	__v: string
	_id: string
}

const userSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
		},
		password: String,
	},
	{
		timestamps: true,
	},
)

userSchema.pre('save', async function (done) {
	if (this.isModified('password')) {
		const hashed = await Password.toHash(this.get('password'))
		this.set('password', hashed)
	}

	done()
})

userSchema.statics.build = (attrs: UserAttrs) => new User(attrs)

const User = model<UserDoc, UserModel>('User', userSchema)

export { User }
