import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import NewBlog from './components/NewBlog'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import { useDispatch, useSelector } from 'react-redux'
import { createNotification } from './slices/notificationSlice'
import { createBlog, fetchBlogs } from './slices/blogSlice'

const App = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const blogFormRef = useRef()
	const dispatch = useDispatch()
	const blogs = useSelector(state => state.blogs)

	useEffect(() => {
		if (!user) return

		dispatch(fetchBlogs())
	}, [user, dispatch])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('user')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			blogService.setToken(user.token)
			setUser(user)
		}
	}, [])


	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username, password,
			})
			setUser(user)
			blogService.setToken(user.token)
			setUsername('')
			setPassword('')
			window.localStorage.setItem('user', JSON.stringify(user))
		}
		catch (error) {
			dispatch(createNotification('invalid username or password'))
		}
	}

	const logout = () => {
		window.localStorage.clear()
		setUser(null)
	}


	const handleCreate = async (newBlog) => {
		blogFormRef.current.toggleVisibility()
		dispatch(createBlog(newBlog))
	}

	const blogForm = () => (
		<>
			<div>
				{user.username} logged in
				<button onClick={logout}>logout</button>
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
