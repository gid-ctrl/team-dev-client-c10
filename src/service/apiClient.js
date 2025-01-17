import { API_URL } from './constants'

async function login(email, password) {
	return await post('login', { email, password }, false)
}

async function register(email, password) {
	return await post('users', { email, password }, false)
}

async function createProfile(userId, firstName, lastName, githubUrl, bio) {
	return await put(`users/${userId}`, {
		firstName,
		lastName,
		githubUrl,
		bio,
	})
}

async function getPosts() {
	const res = await get('posts')
	return res.data.posts
}

async function getUsers() {
	const res = await get('users')
	return res.data.users
}

async function post(endpoint, data, auth = true) {
	return await request('POST', endpoint, data, auth)
}

async function patch(endpoint, data, auth = true) {
	return await request('PATCH', endpoint, data, auth)
}

async function put(endpoint, data, auth = true) {
	return await request('PUT', endpoint, data, auth)
}

async function get(endpoint, auth = true) {
	return await request('GET', endpoint, null, auth)
}

async function deleted(endpoint, data, auth = true) {
	return await request('DELETE', endpoint, data, auth)
}

async function request(method, endpoint, data, auth = true) {
	const opts = {
		headers: {
			'Content-Type': 'application/json',
		},
		method,
	}

	if (method.toUpperCase() !== 'GET') {
		opts.body = JSON.stringify(data)
	}

	if (auth) {
		opts.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`
	}

	const response = await fetch(`${API_URL}/${endpoint}`, opts)

	return response.json()
}

async function getUserProfile(userId) {
  const res = await get(`users/${userId}`);
  return res.data.user;
}

export {

	login,
	getPosts,
	getUsers,
	register,
	createProfile,
	patch,
	get,
	post,
	deleted,
	put,
  getUserProfile

}
