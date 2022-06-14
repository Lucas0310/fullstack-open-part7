import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

export const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		setNotification: (state, action) => {
			return action.payload
		}
	}
})

const { setNotification } = notificationSlice.actions

let timeoutId
export const createNotification = (notification) => {
	return dispatch => {
		dispatch(setNotification(notification))

		if (timeoutId) {
			clearTimeout(timeoutId)
		}

		timeoutId = setTimeout(() => {
			dispatch(setNotification(null))
		}, 5000)
	}
}

export default notificationSlice.reducer