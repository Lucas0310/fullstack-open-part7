import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './slices/notificationSlice'
import blogsReducer from './slices/blogSlice'

export const store = configureStore({
	reducer: {
		notification: notificationReducer,
		blogs: blogsReducer
	}
})