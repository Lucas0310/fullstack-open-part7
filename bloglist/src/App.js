import { useEffect } from 'react'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBlogs } from './slices/blogSlice'
import { fetchLoggedUser } from './slices/userSlice'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { Route, Routes } from 'react-router-dom'
import UsersInfo from './components/UsersInfo'
import UserBlogs from './components/UserBlogs'
import BlogDetail from './components/BlogDetail'

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
			<Routes>
				<Route path='/users' element={<UsersInfo />}></Route>
				<Route path='/users/:id' element={<UserBlogs />}></Route>
				<Route path='/blogs/:id' element={<BlogDetail />}></Route>
				<Route path='/' element={user === null ? <LoginForm /> : <BlogForm />}></Route>
			</Routes>
		</div>
	)
}

export default App
