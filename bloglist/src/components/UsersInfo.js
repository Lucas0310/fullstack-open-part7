import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UsersInfo = () => {
	const blogs = useSelector(state => state.blogs)
	const authors = blogs.reduce((acc, value) => {
		const { name, id } = value.user
		const authorExist = acc.find(x => x.name === name)

		if (authorExist) {
			return acc.map(element => element.name !== name || { ...element, blogsCreated: element.blogsCreated + 1 })
		} else {
			return acc.concat({ name, id, blogsCreated: 1 })
		}

	}, [])

	return (
		<>
			<h1>Users</h1>
			<table>
				<thead>
					<tr>
						<th></th>
						<th>Blogs created</th>
					</tr>
				</thead>
				<tbody>
					{authors.map((element, index) => {
						return (
							<tr key={index}>
								<td>
									<Link to={`/users/${element.id}`}>
										{element.name}
									</Link>
								</td>
								<td>{element.blogsCreated}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</>
	)
}

export default UsersInfo