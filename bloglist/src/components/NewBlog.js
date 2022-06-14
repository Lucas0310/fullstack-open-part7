import { React, useState } from 'react'

const NewBlog = ({ handleCreate }) => {
	const [newBlog, setNewBlog] = useState({})

	const handleChange = e => {
		const { name, value } = e.target
		setNewBlog({ ...newBlog, [name]: value })
	}

	const addBlog = e => {
		e.preventDefault()
		handleCreate(newBlog)
		setNewBlog({})
	}

	return (
		<form onSubmit={addBlog}>
			<div>
				<label>title:</label>
				<input type='text' name='title' onChange={handleChange}></input>
			</div>
			<div>
				<label>author:</label>
				<input type='text' name='author' onChange={handleChange}></input>
			</div>
			<div>
				<label>url:</label>
				<input type='text' name='url' onChange={handleChange}></input>
			</div>
			<br></br>
			<button type='submit'>create</button>
		</form>
	)
}

export default NewBlog