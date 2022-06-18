import propTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	return (
		<div className='blog' style={blogStyle}>
			<Link to={`/blogs/${blog.id}`}>
				{blog.title}
			</Link>
		</div >
	)
}

Blog.propTypes = {
	blog: propTypes.object.isRequired,
}

export default Blog
