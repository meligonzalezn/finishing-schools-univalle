describe('Login OAuth', () => {
  // Case when user can login with univalle account
  it('succesfull case', () => {
    cy.visit('/')
    cy.get('[data-testid="btn-univalle-login"]').click();
    cy.get('[aria-labelledby="button-label"]').click();
  })
})