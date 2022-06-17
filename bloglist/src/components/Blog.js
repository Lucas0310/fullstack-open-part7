import { useState } from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from '../slices/blogSlice'

const Blog = ({ blog }) => {
	const dispatch = useDispatch()
	const [isVisible, setIsVisible] = useState(false)
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	const addLikeToBlog = () => {
		const updatedBlog = { ...blog, likes: blog.likes + 1 }
		dispatch(likeBlog(updatedBlog))
	}

	const showWhenVisible = { display: isVisible ? '' : 'none' }
	const isBlogCreatorLoggedUser = () => {
		const user = JSON.parse(window.localStorage.getItem('user'))
		return user?.username === blog.author
	}
	const showRemoveButton = { display: isBlogCreatorLoggedUser() ? '' : 'none' }
	const toggleVisibility = () => setIsVisible(!isVisible)

	const handleRemove = () => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
			dispatch(deleteBlog(blog.id))
		}
	}

	return (
		<div className='blog' style={blogStyle}>
			{blog.title}
			<button className='viewButton' onClick={() => toggleVisibility()}>{isVisible ? 'hide' : 'view'}</button>
			<div style={showWhenVisible} className='hiddenContent'>
				<div>
					{blog.url}
				</div>
				<div>
					{`likes ${blog.likes}`}
					<button id='likeButton' onClick={() => addLikeToBlog()}>like</button>
				</div>
				<div>
					{blog.author}
				</div>
				<button style={showRemoveButton} onClick={() => handleRemove()}>remove</button>
			</div>
		</div>
	)
}

Blog.propTypes = {
	blog: propTypes.object.isRequired,
}

export default Blog
