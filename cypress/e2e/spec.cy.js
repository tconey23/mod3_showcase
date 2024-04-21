describe('General UI Tests', () => {

  beforeEach(() => {
    cy.intercept('GET', 'https://calmingbe-850b1d5e55e9.herokuapp.com/api/v1/data/activities', 
    { fixture: 'activities.json' }).as('getActivities');

    cy.intercept('GET', 'https://calmingbe-850b1d5e55e9.herokuapp.com/api/v1/data/users/*', 
    { fixture: 'user.json' }).as('getUser');

    cy.intercept('GET', 'https://calmingbe-850b1d5e55e9.herokuapp.com/api/v1/data/users', 
    { fixture: 'users.json' }).as('getUsers');

    cy.intercept('POST', 'https://calmingbe-850b1d5e55e9.herokuapp.com/api/v1/data/users/*', 
    { statusCode: 201 }).as('postThought');

    cy.intercept('POST', 'https://calmingbe-850b1d5e55e9.herokuapp.com/api/v1/data/users/*', 
    { statusCode: 201 }).as('postFavoriteQuote');

    cy.intercept('DELETE', 'https://calmingbe-850b1d5e55e9.herokuapp.com/api/v1/data/users/*', 
    { statusCode: 200 }).as('deleteFavoriteQuote');

    cy.intercept('DELETE', 'https://calmingbe-850b1d5e55e9.herokuapp.com/api/v1/data/users/*', 
    { statusCode: 200 }).as('deleteThought');

    cy.intercept('PUT', 'https://calmingbe-850b1d5e55e9.herokuapp.com/api/v1/data/active_user', 
    { statusCode: 200 }).as('putActiveUser'); 

    cy.intercept('POST', 'https://api.openai.com/v1/chat/completions', {
      statusCode: 200,
      body: {
        id: "0",
        object: "chat_completion",
        created: 123456789,
        model: "gpt-3.5-turbo",
        choices: [
          {
            message: {
              role: "system",
              content: "Positive affirmation: You are doing a great job!"
            }
          }
        ]
      }
    }).as('openAiPost');

    cy.visit('http://localhost:3000/')
  })


  it('should display the landing page', () => {
    cy.get('h3').should('contain.text', "What are you feeling today?")
    cy.get('.dropdown-toggle').should('exist')
    cy.get('input').should('exist')
    cy.get('button').should('exist')
    cy.get('[href="/home"]').should('exist')
    cy.get('.active').should('exist')
  })

  it('should allow a user to log in', () => {
    cy.get('.dropdown-toggle').click()
    cy.get('.dropdown-toggle > :nth-child(1) > span').should('contain.text', 'Tom')
  })
})