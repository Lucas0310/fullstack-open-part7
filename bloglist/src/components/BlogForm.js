import React, { useRef } from 'react'
import NewBlog from './NewBlog'
import Togglable from './Togglable'
import Blog from './Blog'
import { useSelector } from 'react-redux'

const BlogForm = () => {
	const blogs = useSelector(state => state.blogs)
	const blogFormRef = useRef()

	return (
		<>
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