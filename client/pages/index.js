import buildClient from '../api/build-client'

const LandingPage = (currentUser) => {
	return currentUser ? <h1>You are singned in.</h1> : <h1>You are not signed in.</h1>
}

LandingPage.getInitialProps = async (context) => {
	const client = buildClient(context)
	const { data } = await client.get('/api/users/currentuser')
	return data.data
}

export default LandingPage
