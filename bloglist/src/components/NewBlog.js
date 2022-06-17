import { React, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../slices/blogSlice'

const NewBlog = ({ blogFormRef }) => {
	const [newBlog, setNewBlog] = useState({})
	const dispatch = useDispatch()

	const handleChange = e => {
		const { name, value } = e.target
		setNewBlog({ ...newBlog, [name]: value })
	}

	const addBlog = e => {
		e.preventDefault()
		handleCreate(newBlog)
		setNewBlog({})
	}

	const handleCreate = async (newBlog) => {
		blogFormRef.current.toggleVisibility()
		dispatch(createBlog(newBlog))
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