import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { likeBlog } from '../slices/blogSlice'

const BlogDetail = () => {
	const { id } = useParams()
	const blog = useSelector(state => state.blogs.find(x => x.id === id))
	const dispatch = useDispatch()
	const addLikeToBlog = () => {
		const updatedBlog = { ...blog, likes: blog.likes + 1 }
		dispatch(likeBlog(updatedBlog))
	}

	return (
		<div>
			<h1>{blog.title}</h1>

			<a href={blog.url}>{blog.url}</a>
			<div>
				{`likes ${blog.likes}`}
				<button id='likeButton' onClick={() => addLikeToBlog()}>like</button>
			</div>
			<p>added by {blog.user.name}</p>

		</div >
	)
}

export default BlogDetail