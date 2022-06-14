import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
	const blog = {
		author: 'Lucas',
		title: 'blog test',
		url: 'this is an url'
	}

	const { container } = render(<Blog blog={blog}></Blog>)

	const element = screen.getByText('blog test')
	expect(element).toBeDefined()

	const hiddenContentDiv = container.querySelector('.hiddenContent')
	expect(hiddenContentDiv).toHaveStyle('display: none')
})

test('hidden content is shown after pressing the view button', async () => {
	const blog = {
		author: 'Lucas',
		title: 'blog test',
		url: 'this is an url'
	}

	const { container } = render(<Blog blog={blog}></Blog>)

	const button = screen.getByText('view')
	const user = userEvent.setup()
	await user.click(button)

	const hiddenContentDiv = container.querySelector('.hiddenContent')

	expect(button).toHaveTextContent('hide')
	expect(hiddenContentDiv).not.toHaveStyle('display: none')
})

test('if like button is clicked twice, the event is called twice', async () => {
	const blog = {
		author: 'Lucas',
		title: 'blog test',
		url: 'this is an url'
	}
	const mockHandler = jest.fn()
	render(<Blog blog={blog} addLikeToBlog={mockHandler}></Blog>)

	const button = screen.getByText('like')
	const user = userEvent.setup()
	await user.click(button)
	await user.click(button)

	expect(mockHandler.mock.calls).toHaveLength(2)
})