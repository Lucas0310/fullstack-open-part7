import { forwardRef, React, useState, useImperativeHandle } from 'react'

const Togglable = forwardRef((props, ref) => {
	const [isVisible, setIsVisible] = useState(true)

	const toggleVisibility = () => {
		setIsVisible(!isVisible)
	}

	useImperativeHandle(ref, () => {
		return {
			toggleVisibility
		}
	})

	const hideWhenVisible = { display: isVisible ? 'none' : '' }
	const showWhenVisible = { display: isVisible ? '' : 'none' }

	return (
		<>
			<div style={showWhenVisible}>
				<button type='button' onClick={() => toggleVisibility()}>{props.buttonLabel}</button>
			</div>
			<div style={hideWhenVisible}>
				{props.children}
			</div>
			<div style={hideWhenVisible}>
				<button onClick={() => toggleVisibility()}>cancel</button>
			</div>
		</>
	)
})

Togglable.displayName ='Toggable'
export default Togglable