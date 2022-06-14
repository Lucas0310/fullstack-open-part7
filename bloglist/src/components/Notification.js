import { React } from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
	const notification = useSelector(state => state.notification)
	return (
		notification ? <h1>{notification}</h1> : ''
	)
}

export default Notification