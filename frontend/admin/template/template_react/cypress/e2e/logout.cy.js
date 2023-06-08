describe('Edit profile form company', () => {
  
  beforeEach(() => {
    cy.visit('/user/company/login');
    cy.wait(2000);
    cy.fixture('./companyProfile.json').as('profileData')

  });


  it('Logout should be successful', function () {
    //----------login
    cy.get('[id="form-login-company"]').within(() => {
      cy.get('input[data-testid="email-company"]').type(this.profileData.login.email);
      cy.get('input[data-testid="password-company"]').type(this.profileData.login.password);
      cy.get('button[data-testid="submit-company"]').click();
      cy.wait(5000);
      cy.url().should('include', '/dashboard/services');
    });
    
    //------------test

    cy.get('a[id="display-dropdown"]').click()
    
    cy.get('div[id="profile-dropdown"]').within(() => {
  
    cy.get('[id="log-out"]').click();

      
    });
    cy.wait(5000);
    cy.url().should('not.include', '/dashboard/services');

  });
 


});
