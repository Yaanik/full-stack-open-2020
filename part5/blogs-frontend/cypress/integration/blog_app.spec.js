describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user1 = {
            name: 'user one',
            username: 'user1',
            password: 'root'
        }
        const user2 ={
            name: 'user two',
            username: 'user2',
            password: 'root'
        }
        const root ={
            name: 'root user',
            username: 'root',
            password: 'root'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user1)
        cy.request('POST', 'http://localhost:3001/api/users/', user2)
        cy.request('POST', 'http://localhost:3001/api/users/', root)
        cy.login({username: 'user1', password: 'root'})
        cy.createBlog({
            title: 'blog-post3',
            author: 'author3',
            url: 'random.site3',
            likes: 103
        })
        cy.logout()
        cy.login({username: 'user2', password: 'root'})
        cy.createBlog({
            title: 'blog-post1',
            author: 'author1',
            url: 'random.site',
            likes: 999
        })
        cy.createBlog({
            title: 'blog-post2',
            author: 'author2',
            url: 'random.site2',
            likes: 101
        })
    })

    it('Login form is shown', function() {
        cy.contains('Please login to access the application')
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.contains('login').click()
            cy.get('#username').type('root')
            cy.get('#password').type('root')
            cy.get('#login-button').click()

            cy.contains('root user logged in')
        })

        it('fails with wrong credentials', function() {
            cy.contains('login').click()
            cy.get('#username').type('rt')
            cy.get('#password').type('rtt')
            cy.get('#login-button').click()

            cy.get('.error')
                .contains('Incorrect username/password')
                .should('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })

    describe.only('When logged in', function() {
        beforeEach(function() {
            cy.login({username: 'root', password: 'root'})
        })

        it('A blog can be created', function() {
            cy.contains('Add new blog').click()
            cy.get('#title').type('new title')
            cy.get('#author').type('new author')
            cy.get('#url').type('newurl')
            cy.contains('Add blog').click()
            cy.get('.shortBlog').should('have.length', 4)
        })

        it('a blog can be liked', function() {
            cy.createBlog({
                title: 'log to be liked',
                author: 'random',
                url: 'random',
                likes: 2000
            })

            cy.contains('Show more').click()
            cy.contains('Like').click()
            cy.contains('Likes: 1')
        })

        it('a blog can be deleted by the user who created it', function(){
            cy.createBlog({
                title: 'log to be liked',
                author: 'random',
                url: 'random',
                likes: 2000
            })
            cy.visit('http://localhost:3000')
            cy.get('.shortBlog').should('have.length', 4)
            cy.contains('Delete this blog').click()
            cy.get('.shortBlog').should('have.length', 3)

        })
        it('a blog can only be deleted by proper user', function () {
            cy.createBlog({
                title: 'log to be deleted',
                author: 'random',
                url: 'random',
                likes: 2000
            })
            cy.logout()
            cy.visit('http://localhost:3000')
            cy.login({username: 'user1', password: 'root'})
            cy.contains('log to be deleted').parent().parent().should('not.contain', 'Delete this blog')
            cy.contains('blog-post3').parent().parent().should('contain', 'Delete this blog')
            cy.get('.shortBlog').should('have.length', 4)
        })
        // it.only('blogs are sorted by likes', function () {
        //     cy.get('.showMore').then( (buttons) => {
        //         cy.wrap(buttons).click({ multiple: true })
        //         cy.get('.likes').then(likes => {
        //             console.log(likes[0].slice(7, 9))
        //             console.log(likes[1].slice(7, 9))
        //             console.log(likes[2].slice(7, 9))
        //         })
        //     })
        // })

    })
})