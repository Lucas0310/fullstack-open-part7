import React from 'react'
import { useSelector } from 'react-redux'

const UsersInfo = () => {
	const blogs = useSelector(state => state.blogs)
	const authorsAndBlogsCreatedAmount = blogs.reduce((acc, value) => {
		const author = value.user.name
		const authorExist = acc.find(x => x.author === author)

		if (authorExist) {
			return acc.map(element => element.author !== author || { ...element, blogsCreated: element.blogsCreated + 1 })
		} else {
			return acc.concat({ author, blogsCreated: 1 })
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
					{authorsAndBlogsCreatedAmount.map((element, index) => {
						return (
							<tr key={index}>
								<td>{element.author}</td>
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