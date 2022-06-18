import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const UserBlogs = () => {
	const { id } = useParams()
	const blogs = useSelector(state => state.blogs.filter(blog => blog.user.id === id))
	return (
		<>
			<h1>{blogs[0]?.user.name}</h1>
			<h2>Added blogs</h2>
			<ul>
				{
					blogs.map((blog, index) =>
						<li key={index}>
							{blog.title}
						</li>
					)
				}
			</ul>
		</>
	)
}

export default UserBlogs