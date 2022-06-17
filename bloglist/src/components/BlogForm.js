import React, { useRef } from 'react'
import NewBlog from './NewBlog'
import Togglable from './Togglable'
import Blog from './Blog'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../slices/userSlice'

const BlogForm = () => {
	const blogs = useSelector(state => state.blogs)
	const user = useSelector(state => state.user)
	const blogFormRef = useRef()
	const dispatch = useDispatch()

	const handleLogout = () => {
		dispatch(logoutUser())
	}

	return (
		<>
			<div>
				{user.username} logged in
				<button onClick={handleLogout}>logout</button>
			</div>
			<br></br>
			<div>
				<Togglable ref={blogFormRef} buttonLabel='New Blog'>
					<NewBlog blogFormRef={blogFormRef} />
				</Togglable>
			</div>
			<br></br>
			<ul>
				{blogs.map((blog, i) =>
					<div key={i}>
						<Blog blog={blog}></Blog>
					</div>
				)}
			</ul>
		</>
	)
}

export default BlogForm