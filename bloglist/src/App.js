import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import NewBlog from './components/NewBlog'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import { useDispatch } from 'react-redux'
import { createNotification } from './slices/notificationSlice'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const blogFormRef = useRef()
	const dispatch = useDispatch()

	useEffect(() => {
		if (!user) return

		blogService.getAll().then(blogs =>
			setBlogs(blogs)
		)
	}, [user])

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
		try {
			const addedBlog = await blogService.create(newBlog)
			setBlogs(blogs.concat(addedBlog))
		} catch (e) {
			console.log(e)
		}
	}

	const addLikeToBlog = async (blog) => {
		const updatedBlog = { ...blog, likes: blog.likes + 1 }
		const response = await blogService.update(updatedBlog)

		const blogIndex = blogs.findIndex(x => x.id === blog.id)
		const blogsCopy = [...blogs]
		blogsCopy[blogIndex] = response

		setBlogs(blogsCopy.sort((a, b) => a.likes > b.likes ? -1 : 1))
	}

	const removeBlog = async (id) => {
		try {
			await blogService.remove(id)
			const blogsCopy = blogs.filter(x => x.id !== id)
			setBlogs(blogsCopy)
		} catch (e) {
			window.alert(e)
		}
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
						<Blog blog={blog} addLikeToBlog={addLikeToBlog} removeBlog={removeBlog}></Blog>
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
			<Notification/>
			{user === null ? loginForm() : blogForm()}
		</div>
	)
}

export default App
