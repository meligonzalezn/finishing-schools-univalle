describe('Login company', () => {

  beforeEach(() => {
    cy.visit('/');
    cy.wait(2000);
    cy.get('[data-testid="btn-company-login"]').click();
    cy.url().should('include', '/user/company/login');
    cy.fixture('./company.json').as('loginData');
  });

  it('Login should be successful', function () {
    cy.get('[id="form-login-company"]').within(() => {
      cy.get('input[data-testid="email-company"]').type(this.loginData.success.email);
      cy.get('input[data-testid="password-company"]').type(this.loginData.success.password);
      cy.get('button[data-testid="submit-company"]').click();
      cy.wait(5000);
      cy.url().should('include', '/dashboard/services');
    });
  }); 

  it('Login should fail', function () {
    cy.get('[id="form-login-company"]').within(() => {
      cy.get('input[data-testid="email-company"]').type(this.loginData.error.email);
      cy.get('input[data-testid="password-company"]').type(this.loginData.error.password);
      cy.get('button[data-testid="submit-company"]').click();
      cy.wait(5000);
      cy.url().should('include', '/user/company/login');
      cy.get('div[class="invalid-feedback"]').should('be.visible');
    });
  });
});
