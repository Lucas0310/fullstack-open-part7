import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../slices/userSlice'

const Navbar = () => {
	const user = useSelector(state => state.user)
	const dispatch = useDispatch()

	const handleLogout = () => {
		dispatch(logoutUser())
	}

	const style = {
		display: 'flex',
		alignItems: 'baseline',
		columnGap: '5px',
		backgroundColor: '#ADD8E6',
	}

	return (
		<div style={style}>
			<Link to={'/'}>blogs </Link>
			<Link to={'users'}>users </Link>
			<p>{user.name} logged in </p>
			<div>
				<button onClick={handleLogout}>logout</button>

			</div>
		</div>
	)
}

export default Navbar