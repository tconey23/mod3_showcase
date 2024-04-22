describe('General UI Tests', () => {

  beforeEach(() => {
    cy.intercept('GET', 'https://calmingbe-850b1d5e55e9.herokuapp.com/api/v1/data/activities', 
    { fixture: 'activities.json' }).as('getActivities');

    cy.intercept('GET', 'https://calmingbe-850b1d5e55e9.herokuapp.com/api/v1/data/users/*', 
    { fixture: 'user.json' }).as('getUser');

    cy.intercept('GET', 'https://calmingbe-850b1d5e55e9.herokuapp.com/api/v1/data/users', 
    { fixture: 'users.json' }).as('getUsers');

    cy.intercept('POST', 'https://calmingbe-850b1d5e55e9.herokuapp.com/api/v1/data/users/2/*', 
    { fixture: 'users.json', statusCode: 200 }).as('postThought');

    cy.intercept('POST', 'https://calmingbe-850b1d5e55e9.herokuapp.com/api/v1/data/users/*/messages', {
      fixture: 'users.json',
      statusCode: 201,
      }).as('postFavoriteQuote');

    cy.intercept('DELETE', 'https://calmingbe-850b1d5e55e9.herokuapp.com/api/v1/data/users/2/messages', 
    {fixture: 'users.json',
      statusCode: 201}).as('deleteFavoriteQuote');

    cy.intercept('POST', 'https://calmingbe-850b1d5e55e9.herokuapp.com/api/v1/data/active_user', 
    { statusCode: 200 }).as('putActiveUser'); 
  
          cy.intercept('POST', 'https://api.openai.com/v1/chat/completions', (req) => {
              req.reply({
                  statusCode: 200,
                  body: {
                      "id": "exampleID",
                      "object": "chat.completion",
                      "created": 1609459200,
                      "model": "gpt-3.5-turbo",
                      "choices": [
                          {
                              "index": 0,
                              "message": {
                                  "role": "assistant",
                                  "content": "This is a positive affirmation for a child."
                              },
                              "logprobs": null,
                              "finish_reason": "stop"
                          },
                          {
                            "index": 1,
                            "message": {
                                "role": "assistant",
                                "content": "Another positive message"
                            },
                            "logprobs": null,
                            "finish_reason": "stop"
                        }
                      ]
                  }
              });
          }).as('openAI');

    cy.visit('http://localhost:3000/')
  })


  it('should display the landing page', () => {
    cy.get('.dropdown-toggle').should('exist')
  })

  it('should allow a user to select their name', () => {
    cy.get('.dropdown-toggle').click()
    .get('.dropdown-item:first').should('contain.text', 'Tom')
    .get('.dropdown-item:last').should('contain.text', 'Max')

    .get('.dropdown-item:first').click()
    .get('.dropdown-toggle').should('contain.text', 'Tom')
    .get('h3').should('contain.text', "What are you feeling today?")

    .get('input').should('exist')
    .get('[href="/home"]').should('exist')
    .get('.active').should('exist')
  })

  it('should allow a user to skip adding a thought', () => {
    cy.get('.dropdown-toggle').click()
    .get('.dropdown-item:first').should('contain.text', 'Tom')
    .get('.dropdown-item:last').should('contain.text', 'Max')

    .get('.dropdown-item:first').click()
    .get('.dropdown-toggle').should('contain.text', 'Tom')
    .get(':nth-child(2) > a').click()
    .url().should('eq', 'http://localhost:3000/home')
  })

  it('should allow a user to add a thought', () => {
    cy.get('.dropdown-toggle').click()
    cy.get('.dropdown-item:first').should('contain.text', 'Tom')
    cy.get('.dropdown-item:last').should('contain.text', 'Max')

    cy.get('.dropdown-item:first').click()
    cy.get('.dropdown-toggle').should('contain.text', 'Tom') 
    cy.get('input').type('I am feeling happy')
  })

  it('should take the user to their personal home page', () => {
    cy.get('.dropdown-toggle').click()
    cy.get('.dropdown-item:last').click()
    cy.get('.dropdown-toggle').should('contain.text', 'Max')
    
    cy.get('input').type('Happy')
    cy.get('button').click()
    cy.url().should('eq', 'http://localhost:3000/home')

    cy.get('aside')
    .get('#currentUser').should('contain.text', 'Max')
  })


  it('should display a users favorite messages and thoughts', () => {
    cy.get('.dropdown-toggle').click()
    cy.get('.dropdown-item:last').click()
    cy.get('.dropdown-toggle').should('contain.text', 'Max')
    
    cy.get('input').type('Happy')
    cy.get('button').click()
    cy.url().should('eq', 'http://localhost:3000/home')

    cy.get('aside')
    .get('#currentUser').should('contain.text', 'Max')
    .get('#messageText').should('contain.text', 'This is a positive affirmation for a child.')
    .get('aside > :nth-child(4)').click()
    .get('h4').should('contain.text', 'Your thoughts')
  
    .get('aside > :nth-child(4)').should('contain.text', 'Toggle Views').click()
    .get('h4').should('contain.text', 'Your Favorite Messages')
    .get('#favoriteQuotes > :nth-child(2)').should('contain.text', "You are capable of achieving anything you set your mind to!")
    .get('#favoriteQuotes > :nth-child(3)').should('contain.text', "You are capable of achieving amazing things!")
    .get('#favoriteQuotes > :nth-child(4)').should('contain.text', "You are strong, smart, and capable of achieving anything you set your mind to!")
  })


  it('should allow a user to manipulate their favorite messages (favorite, refresh)', () => {
    cy.get('.dropdown-toggle').click()
    cy.get('.dropdown-item:last').click()
    cy.get('.dropdown-toggle').should('contain.text', 'Max')
    
    cy.get('input').type('Happy')
    cy.get('button').click()
    cy.url().should('eq', 'http://localhost:3000/home')

    cy.get('aside')
    .get('#currentUser').should('contain.text', 'Max')
    .get('#messageText').should('contain.text', "This is a positive affirmation for a child")
  
    .get('aside > :nth-child(4)').should('contain.text', 'Toggle Views').click()
    .get('h4').should('contain.text', 'Your Favorite Messages')
  cy.get('#currentUser > svg').click()

  cy.get('#favHeart').click()
  
  //Get new message when the refresh button is clicked
  cy.wait('@openAI').then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
  });

//Post favorite message to server
cy.wait('@postFavoriteQuote').then((interception) => {
  expect(interception.response.statusCode).to.eq(201);
  cy.fixture('users.json').then((expectedResponse) => {
      expect(interception.response.body).to.deep.equal(expectedResponse);
  });
});
})

it('should allow a user to manipulate their favorite messages (delete)', () => {
  cy.get('.dropdown-toggle').click()
  cy.get('.dropdown-item:last').click()
  cy.get('.dropdown-toggle').should('contain.text', 'Max')
  
  cy.get('input').type('Happy')
  cy.get('button').click()
  cy.url().should('eq', 'http://localhost:3000/home')

  cy.get('aside')
  .get('#currentUser').should('contain.text', 'Max')
  .get('#messageText').should('contain.text', "This is a positive affirmation for a child")

// //Delete favorite message
.get('#favoriteQuotes > :nth-child(2) > button').click()
cy.wait('@deleteFavoriteQuote').then((interception) => {
  expect(interception.response.statusCode).to.eq(201);
  cy.fixture('users.json').then((expectedResponse) => {
      expect(interception.response.body).to.deep.equal(expectedResponse);
  });
});
})

  it('should allow the user to log out', () => {
    cy.get('[href="/"]').click()
    cy.get('.dropdown-toggle').should('exist')
    cy.get('[href="/home"]').should('exist')
    cy.get('.active').should('exist')
  })

  it('should allow the user to select an activity', () => {
    cy.get('.dropdown-toggle').click()
    cy.get('.dropdown-item:last').click()
    cy.get('.dropdown-toggle').should('contain.text', 'Max')
    
    cy.get('input').type('Happy')
    cy.get('button').click()

    //Fidgets
    cy.get('#draggable > :nth-child(1) > #bubble > #linkToPage').click()
    .get('#fidgetMenu').click().get('#PropFidget').click()
    .get('#fidgetContainer > div > svg').should('exist')
    .get('#fidgetMenu').click().get('#YinyangFidget').click()
    .get('#fidgetContainer > div > svg').should('exist')
    .get('#fidgetMenu').click().get('#FlowerFidget').click()
    .get('#fidgetContainer > div > svg').should('exist')
    
    cy.get('#fidgetContainer > div > svg').then($el => {
      const rect = $el[0].getBoundingClientRect();
      cy.wrap($el).trigger('mousedown', {
        button: 0,
        clientX: rect.left + 10,
        clientY: rect.top + 10
      }).trigger('mousemove', {
        clientX: 500,
        clientY: 400
      }).trigger('mouseup', { force: true });
    })
    cy.get('#fidgetComponent > #menu > #dropdown > div > :nth-child(2)').click()
    
    //Go back to home screen
    cy.get('#headerLinks:first').click()

    //Sandbox
    cy.get('#draggable > :nth-child(2) > #bubble > #linkToPage').click() 
    .get('canvas').should('exist')
    .get('#resetButton').click()

      //Go back to home screen
      cy.get('#headerLinks:first').click()

  })

})