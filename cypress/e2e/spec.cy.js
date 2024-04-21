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

    cy.intercept('POST', 'https://calmingbe-850b1d5e55e9.herokuapp.com/api/v1/data/users/*', {
      statusCode: 201,
      body: {
          message: "Favorite quote added successfully"
      }
      }).as('postFavoriteQuote');

    cy.intercept('DELETE', 'https://calmingbe-850b1d5e55e9.herokuapp.com/api/v1/data/users/*', 
    { 
      statusCode: 201,
      body: {
          message: "Favorite quote deleted successfully"
      } }).as('deleteFavoriteQuote');

    cy.intercept('PUT', 'https://calmingbe-850b1d5e55e9.herokuapp.com/api/v1/data/active_user', 
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
    cy.get('h3').should('contain.text', "What are you feeling today?")
    cy.get('.dropdown-toggle').should('exist')
    cy.get('input').should('exist')
    cy.get('button').should('exist')
    cy.get('[href="/home"]').should('exist')
    cy.get('.active').should('exist')
  })

  // it('should allow a user to select their name', () => {
  //   cy.get('.dropdown-toggle').click()
  //   cy.get('.dropdown-item:first').should('contain.text', 'Tom')
  //   cy.get('.dropdown-item:last').should('contain.text', 'Max')

  //   cy.get('.dropdown-item:first').click()
  //   cy.get('.dropdown-toggle').should('contain.text', 'Tom')
  // })

  // it('should allow a user to skip adding a thought', () => {
  //   cy.get('.dropdown-toggle').click()
  //   cy.get('.dropdown-item:first').should('contain.text', 'Tom')
  //   cy.get('.dropdown-item:last').should('contain.text', 'Max')

  //   cy.get('.dropdown-item:first').click()
  //   cy.get('.dropdown-toggle').should('contain.text', 'Tom')
  //   cy.get('form > a').click()
  //   cy.url().should('eq', 'http://localhost:3000/home')
  // })

  // it('should allow a user to add a thought', () => {
  //   cy.get('.dropdown-toggle').click()
  //   cy.get('.dropdown-item:first').should('contain.text', 'Tom')
  //   cy.get('.dropdown-item:last').should('contain.text', 'Max')

  //   cy.get('.dropdown-item:first').click()
  //   cy.get('.dropdown-toggle').should('contain.text', 'Tom')
    
  //   cy.get('input').type('I am feeling happy')
  //   cy.get('button').click()
  //   cy.url().should('eq', 'http://localhost:3000/home')
  // })

  // it('should take the user to their personal home page', () => {
  //   cy.get('.dropdown-toggle').click()
  //   cy.get('.dropdown-item:last').click()
  //   cy.get('.dropdown-toggle').should('contain.text', 'Max')
    
  //   cy.get('input').type('Happy')
  //   cy.get('button').click()
  //   cy.url().should('eq', 'http://localhost:3000/home')

  //   cy.get('aside')
  //   .get('#currentUser').should('contain.text', 'Max')
  // })


  // it('should display a users favorite messages and thoughts', () => {
  //   cy.get('.dropdown-toggle').click()
  //   cy.get('.dropdown-item:last').click()
  //   cy.get('.dropdown-toggle').should('contain.text', 'Max')
    
  //   cy.get('input').type('Happy')
  //   cy.get('button').click()
  //   cy.url().should('eq', 'http://localhost:3000/home')

  //   cy.get('aside')
  //   .get('#currentUser').should('contain.text', 'Max')
  //   .get('#messageText').should('contain.text', 'You are kind, unique, and capable of achieving anything you set your mind to.')
  //   .get('h4').should('contain.text', 'Your thoughts')
  //   .get('#thought0').should('contain.text', 'Happy')
  
  //   .get('aside > :nth-child(4)').should('contain.text', 'Toggle Views').click()
  //   .get('h4').should('contain.text', 'Your Favorite Messages')
  //   .get('#favoriteQuotes').get('#fav0').should('contain.text', "Struggling is part of learning")
  //   .get('#favoriteQuotes').get('#fav1').should('contain.text',  "You'll find a way")
  //   .get('#favoriteQuotes').get('#fav2').should('contain.text', "I know you\'ll sort it out")
  // })


  it('should allow a user to manipulate their favorite messages (favorite, delete, refresh)', () => {
    cy.get('.dropdown-toggle').click()
    cy.get('.dropdown-item:last').click()
    cy.get('.dropdown-toggle').should('contain.text', 'Max')
    
    cy.get('input').type('Happy')
    cy.get('button').click()
    cy.url().should('eq', 'http://localhost:3000/home')

    cy.get('aside')
    .get('#currentUser').should('contain.text', 'Max')
    .get('#messageText').should('contain.text', "This is a positive affirmation for a child")
    .get('h4').should('contain.text', 'Your thoughts')
    .get('#thought0').should('contain.text', 'Happy')
  
    .get('aside > :nth-child(4)').should('contain.text', 'Toggle Views').click()
    .get('h4').should('contain.text', 'Your Favorite Messages')
  cy.get('#currentUser > svg').click()
  
  //Get new message when the refresh button is clicked
  cy.wait('@openAI').then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
      expect(interception.response.body.choices[0].message.content).to.eq("This is a positive affirmation for a child.")
  });

  cy.wait('@openAI').then((interception) => {
    expect(interception.response.statusCode).to.eq(200);
    expect(interception.response.body.choices[1].message.content).to.eq("Another positive message")
  });

//Post favorite message to server
cy.get('#favHeart').click()
cy.wait('@postFavoriteQuote').then((interception) => {
    expect(interception.response.statusCode).to.eq(201)
    expect(interception.response.body.message).to.eq("Favorite quote added successfully")
});

//Delete favorite message
cy.get('#fav0 > button').click()
cy.wait('@deleteFavoriteQuote').then((interception) => {
    expect(interception.response.statusCode).to.eq(201)
    expect(interception.response.body.message).to.eq("Favorite quote deleted successfully")
});
})

  // it('should allow the user to log out', () => {
  //   cy.get('[href="/"]').click()
  //   cy.get('h3').should('contain.text', "What are you feeling today?")
  //   cy.get('.dropdown-toggle').should('exist')
  //   cy.get('input').should('exist')
  //   cy.get('button').should('exist')
  //   cy.get('[href="/home"]').should('exist')
  //   cy.get('.active').should('exist')
  // })

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