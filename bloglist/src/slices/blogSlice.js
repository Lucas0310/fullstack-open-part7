import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = []

export const blogSlice = createSlice({
	name: 'blogs',
	initialState,
	reducers: {
		setBlogs: (state, action) => {
			return action.payload
		},
		addBlog: (state, action) => {
			return state.concat(action.payload)
		},
		updateBlog: (state, action) => {
			const updatedBlog = action.payload
			const blogIndex = state.findIndex(x => x.id === updatedBlog.id)
			state[blogIndex] = updatedBlog
			return state.sort((a, b) => a.likes > b.likes ? -1 : 1)
		},
		removeBlog: (state, action) => {
			const id = action.payload
			const blogs = state.filter(x => x.id !== id)
			return blogs
		}
	}
})

const { setBlogs, addBlog, updateBlog, removeBlog } = blogSlice.actions
export default blogSlice.reducer

export const fetchBlogs = () => async dispatch => {
	const res = await blogService.getAll()
	dispatch(setBlogs(res))
}

export const createBlog = newBlog => async dispatch => {
	const res = await blogService.create(newBlog)
	dispatch(addBlog(res))
}

export const likeBlog = blogToUpdate => async dispatch => {
	const res = await blogService.update(blogToUpdate)
	dispatch(updateBlog(res))
}

export const deleteBlog = id => async dispatch => {
	await blogService.remove(id)
	dispatch(removeBlog(id))
}