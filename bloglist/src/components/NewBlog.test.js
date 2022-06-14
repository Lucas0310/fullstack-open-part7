import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlog from './NewBlog'


test('<NewBlog> create handler should recieve the correct object when creating a blog', async () => {
	const createBlogHandler = jest.fn()
	const user = userEvent.setup()

	const { container } = render(<NewBlog handleCreate={createBlogHandler}></NewBlog>)

	const button = screen.getByText('create')
	const titleInput = container.querySelector('[name="title"]')
	const authorInput = container.querySelector('[name="author"]')
	const urlInput = container.querySelector('[name="url"]')

	await user.type(titleInput, 'this is a blog')
	await user.type(authorInput, 'Lucas')
	await user.type(urlInput, 'this is an url')
	await user.click(button)

	const { title, author, url } = createBlogHandler.mock.calls[0][0]

	expect(createBlogHandler.mock.calls).toHaveLength(1)
	expect(title).toBe('this is a blog')
	expect(author).toBe('Lucas')
	expect(url).toBe('this is an url')
})