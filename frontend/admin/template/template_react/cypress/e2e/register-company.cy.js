describe('Register form company', () => {
  
  beforeEach(() => {
    cy.visit('/');
    cy.wait(2000);
    cy.get('a[data-testid="register-company"]').click();
    cy.fixture('./company.json').as('registerData');
  });

  it('Empty fields validation should show warnings', function () {
    cy.url().should('include', '/user/company/register');
    cy.get('button[data-testid="register-button-company"]').click();
    // Verify that the warnings are visible
    cy.get('div.invalid-feedback').should('be.visible');
    // Should be 4 because there are 4 fields 
    cy.get('div.invalid-feedback').should('have.length', 4);
  }); 

  it('Register without accepting terms should show warning', function () {
    cy.get('[id="register-form-company"]').within(() => {
      cy.get('input[id="companyName"]').type(this.registerData.companyRegister.success.name);
      cy.get('input[id="email"]').type(this.registerData.companyRegister.success.email);
      cy.get('input[id="password"]').type(this.registerData.companyRegister.success.password);
      cy.get('input[id="passwordConfirmed"]').type(this.registerData.companyRegister.success.password);
      cy.get('button[data-testid="register-button-company"]').click();
      cy.url().should('include', '/user/company/register');
    });
    cy.get('div.rnc__notification').should('be.visible');
  }); 

  it('Password and password confirmed should be the same', function () {
    cy.get('[id="register-form-company"]').within(() => {
      cy.get('input[id="companyName"]').type(this.registerData.companyRegister.success.name);
      cy.get('input[id="email"]').type(this.registerData.companyRegister.success.email);
      cy.get('input[id="password"]').type(this.registerData.companyRegister.success.password);
      cy.get('input[id="passwordConfirmed"]').type(this.registerData.error.password);
      cy.get('button[data-testid="register-button-company"]').click();
  
      cy.get('div.invalid-feedback')
        .should('be.visible')
        .should('have.length', 1)
        .invoke('text').should('equal', 'Las contraseñas deben coincidir');
    });
  }); 
  
  it('Email should be unique', function () {
    cy.get('[id="register-form-company"]').within(() => {
      cy.get('input[id="companyName"]').type(this.registerData.companyRegister.success.name);
      cy.get('input[id="email"]').type(this.registerData.success.email);
      cy.get('input[id="password"]').type(this.registerData.companyRegister.success.password);
      cy.get('input[id="passwordConfirmed"]').type(this.registerData.companyRegister.success.password);
      cy.get('div.invalid-feedback')
      .should('be.visible')
      .should('have.length', 1)
      .invoke('text').should('contains', 'Correo ya registrado');
    });
  });

  it('Register should be successful', function () {
    cy.get('[id="register-form-company"]').within(() => {
      cy.get('input[id="companyName"]').type(this.registerData.companyRegister.success.name);
      cy.get('input[id="email"]').type(this.registerData.companyRegister.success.email);
      cy.get('input[id="password"]').type(this.registerData.companyRegister.success.password);
      cy.get('input[id="passwordConfirmed"]').type(this.registerData.companyRegister.success.password);
      cy.get('input[id="agreement"]').click();
      cy.get('button[data-testid="register-button-company"]').click();
      cy.wait(5000);
    });
    cy.get('div.rnc__notification').should('be.visible');
  });


});
