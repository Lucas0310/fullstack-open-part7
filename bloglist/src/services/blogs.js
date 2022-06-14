import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
	token = `bearer ${newToken}`
}

const getConfig = () => {
	return {
		headers: { Authorization: token },
	}
}

const create = async newObject => {

	const response = await axios.post(baseUrl, newObject, getConfig())
	return response.data
}

const getAll = async () => {
	const response = await axios.get(baseUrl, getConfig())
	return response.data.sort((a, b) => a.likes > b.likes ? -1 : 1)
}

const update = async objectToUpdate => {
	const response = await axios.put(`${baseUrl}/${objectToUpdate.id}`, objectToUpdate, getConfig())
	return response.data
}

const remove = async id => {
	await axios.delete(`${baseUrl}/${id}`, getConfig())
}

export default { getAll, setToken, create, update, remove }