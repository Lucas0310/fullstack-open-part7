import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../slices/userSlice'

const LoginForm = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const dispatch = useDispatch()

	const handleLogin = async (event) => {
		event.preventDefault()
		dispatch(loginUser(username, password))
		setUsername('')
		setPassword('')
	}

	return (
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
}

export default LoginForm