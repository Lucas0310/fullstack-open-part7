import { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import NewBlog from './components/NewBlog'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog, fetchBlogs } from './slices/blogSlice'
import { fetchLoggedUser, loginUser, logoutUser } from './slices/userSlice'

const App = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const blogFormRef = useRef()
	const dispatch = useDispatch()
	const blogs = useSelector(state => state.blogs)
	const user = useSelector(state => state.user)

	useEffect(() => {
		if (!user) return

		dispatch(fetchBlogs())
	}, [user, dispatch])

	useEffect(() => {
		dispatch(fetchLoggedUser())
	}, [dispatch])


	const handleLogin = async (event) => {
		event.preventDefault()
		dispatch(loginUser(username, password))
		setUsername('')
		setPassword('')
	}

	const handleLogout = () => {
		dispatch(logoutUser())
	}


	const handleCreate = async (newBlog) => {
		blogFormRef.current.toggleVisibility()
		dispatch(createBlog(newBlog))
	}

	const blogForm = () => (
		<>
			<div>
				{user.username} logged in
				<button onClick={handleLogout}>logout</button>
			</div>
			<br></br>
			<div>
				<Togglable ref={blogFormRef} buttonLabel='New Blog'>
					<NewBlog handleCreate={handleCreate} />
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

	const loginForm = () => (
		<form id='loginForm' onSubmit={handleLogin}>
			<div>
				username
				<input
					id='username'
					type="text"
					value={username}
					name="Username"
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				password
				<input
					id='password'
					type="password"
					value={password}
					name="Password"
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button id='login' type="submit">login</button>
		</form>
	)

	return (
		<div>
			<h1>{user === null ? 'login to application' : 'blogs'}</h1>
			<Notification />
			{user === null ? loginForm() : blogForm()}
		</div>
	)
}

export default App
