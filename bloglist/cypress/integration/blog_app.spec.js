describe('Blog app', function () {
	beforeEach(function () {
		cy.request('POST', 'http://localhost:3003/api/testing/reset')

		cy.request('POST', 'http://localhost:3003/api/users', { "username": "Test", "name": "Test", "password": "Test" }).then(response => {
			expect(response.status).to.eq(201)
		})

		cy.visit('http://localhost:3000')
	})

	it('Login form is shown', function () {
		cy.contains('login to application')
	})

	describe('Login', function () {
		it('succeeds with correct credentials', function () {
			cy.get('#username').type('Test')
			cy.get('#password').type('Test')
			cy.get('#login').click()
			cy.contains('blogs')
		})

		it('fails with wrong credentials', function () {
			cy.get('#username').type('ThisIsWrong')
			cy.get('#password').type('ThisIsWrong')
			cy.get('#login').click()
			cy.contains('invalid username or password')
		})
	})
})

describe('When logged in', function () {
	beforeEach(function () {
		cy.request('POST', 'http://localhost:3003/api/login', { "username": "Test", "password": "Test" }).then(response => {
			expect(response.status).to.eq(200)
			localStorage.setItem('user', JSON.stringify(response.body))
			cy.visit('http://localhost:3000')
		})
	})

	it('a new blog can be created', function () {
		cy.contains('New Blog').click()
		cy.get('[name="title"]').type('This is a new blog')
		cy.get('[name="author"]').type('Me')
		cy.get('[name="url"]').type('This is a url')
		cy.contains("create").click()

		cy.contains('This is a new blog')

		cy.contains('view').click()

		cy.contains('This is a url')
		cy.contains('Me')
	})
})

describe('When one or more blogs are already added into the database', function () {
	beforeEach(function () {
		cy.request('POST', 'http://localhost:3003/api/testing/reset')

		cy.request('POST', 'http://localhost:3003/api/users', { "username": "Test", "name": "Test", "password": "Test" }).then(createUserResponse => {
			expect(createUserResponse.status).to.eq(201)

			cy.request('POST', 'http://localhost:3003/api/login', { username: "Test", password: "Test" }).then(loginResponse => {
				expect(loginResponse.status).to.eq(200)
				localStorage.setItem('user', JSON.stringify(loginResponse.body))

				cy.addBlog({ title: "This is a new blog", author: "Test", url: "This is a url" })
				cy.addBlog({ title: "Blog 2", author: "Test 2", url: "This is a url" })


				cy.visit('http://localhost:3000')
			})
		})
	})

	it('a blog can be liked', function () {
		cy.contains('view').click()
		cy.contains('like').click()
		cy.contains('likes 1')
	})

	it('a blog can be deleted by the user that created it', function () {
		cy.contains('view').click()
		cy.contains('remove').click()
		cy.contains('This is a new blog').should('not.exist')
	})

	it('blogs are ordered by likes', function () {

		cy.get('.viewButton').eq(1).click()

		cy.get('.blog').eq(1).contains('like').click()
		cy.contains('hide').click()

		cy.get('.blog').eq(0).should('contain', 'Blog 2')
		cy.get('.blog').eq(1).should('contain', 'This is a new blog')
	})
})