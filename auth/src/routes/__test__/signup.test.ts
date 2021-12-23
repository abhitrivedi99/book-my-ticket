import request from 'supertest'
import { app } from '../../app'

it('returns a 201 on successful signup', async () => {
	return request(app).post('/api/users/signup').send({ email: 'test@test.com', password: '12345678' }).expect(201)
})

it('returns a 422 with misssing email & password', async () => {
	await request(app).post('/api/users/signup').send({ password: 'test@test.com' }).expect(422)

	await request(app).post('/api/users/signup').send({ email: 'test@test.com' }).expect(422)
})

it('returns a 422 with invalid email', async () => {
	return request(app).post('/api/users/signup').send({ email: '@test.com', password: '12345677' }).expect(422)
})

it('returns a 422 with invalid password', async () => {
	return request(app).post('/api/users/signup').send({ email: 'test@test.com', password: '123' }).expect(422)
})

it('disallow duplicate email', async () => {
	await request(app).post('/api/users/signup').send({ email: 'test@test.com', password: '12345678' }).expect(201)

	await request(app).post('/api/users/signup').send({ email: 'test@test.com', password: '12345678' }).expect(400)
})

it('sets a cookie after successful signup', async () => {
	const response = await request(app)
		.post('/api/users/signup')
		.send({ email: 'test@test.com', password: '12345678' })
		.expect(201)

	expect(response.get('Set-Cookie')).toBeDefined()
})
