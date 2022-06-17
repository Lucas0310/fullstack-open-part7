import { useEffect } from 'react'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBlogs } from './slices/blogSlice'
import { fetchLoggedUser } from './slices/userSlice'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)

	useEffect(() => {
		if (!user) return

		dispatch(fetchBlogs())
	}, [user, dispatch])

	useEffect(() => {
		dispatch(fetchLoggedUser())
	}, [dispatch])

	return (
		<div>
			<h1>{user === null ? 'login to application' : 'blogs'}</h1>
			<Notification />
			{user === null ? <LoginForm /> : <BlogForm />}
		</div>
	)
}

export default App
