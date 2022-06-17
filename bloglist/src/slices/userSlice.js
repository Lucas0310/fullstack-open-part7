import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'
import loginService from '../services/login'
import { createNotification } from './notificationSlice'

const initialState = null

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			const user = action.payload
			if (user) {
				window.localStorage.setItem('user', JSON.stringify(user))
				blogsService.setToken(user.token)
			}
			return user
		}
	}
})

const { setUser } = userSlice.actions
export default userSlice.reducer

export const loginUser = (username, password) => async dispatch => {
	try {
		const res = await loginService.login({ username, password })
		dispatch(setUser(res))
	} catch {
		dispatch(createNotification('invalid username or password'))
	}
}

export const logoutUser = () => dispatch => {
	window.localStorage.clear()
	dispatch(setUser(null))
}

export const fetchLoggedUser = () => dispatch => {
	const loggedUser = JSON.parse(window.localStorage.getItem('user'))
	if (loggedUser) {
		blogsService.setToken(loggedUser.token)
		dispatch(setUser(loggedUser))
	}
}