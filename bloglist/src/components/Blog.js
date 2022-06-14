import { useState } from 'react'
import propTypes from 'prop-types'

const Blog = ({ blog, addLikeToBlog, removeBlog }) => {
	const [isVisible, setIsVisible] = useState(false)
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
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
			removeBlog(blog.id)
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
					<button id='likeButton' onClick={() => addLikeToBlog(blog)}>like</button>
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
	addLikeToBlog: propTypes.func.isRequired,
	removeBlog: propTypes.func.isRequired
}

export default Blog
