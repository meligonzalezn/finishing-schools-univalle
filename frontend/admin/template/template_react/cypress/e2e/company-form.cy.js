describe('Edit profile form company', () => {
  
  beforeEach(() => {
    cy.visit('/user/company/login');
    cy.wait(2000);
    cy.fixture('./companyProfile.json').as('profileData')

  });

  it('Profile register with empty strictly required fields should show warnings', function () {
    //----------login
    cy.get('[id="form-login-company"]').within(() => {
      cy.get('input[data-testid="email-company"]').type(this.profileData.login.email);
      cy.get('input[data-testid="password-company"]').type(this.profileData.login.password);
      cy.get('button[data-testid="submit-company"]').click();
      cy.wait(5000);
      cy.url().should('include', '/dashboard/services');
    });
    cy.visit('/user/company/profile');
    cy.wait(2000);
    
    //------------test
    cy.get('button[data-testid="register-company-profile-button"]').click();
    
    cy.get('div.invalid-feedback')
      // Verify that the warnings are visible
      .should('be.visible')
       // Should be 1 because there is 1 field strictly required 
      .should('have.length', 1)
      .invoke('text').should('equal', 'Campo obligatorio');
   

  }); 

  it('Profile register should be successful', function () {
    //----------login
    cy.get('[id="form-login-company"]').within(() => {
      cy.get('input[data-testid="email-company"]').type(this.profileData.login.email);
      cy.get('input[data-testid="password-company"]').type(this.profileData.login.password);
      cy.get('button[data-testid="submit-company"]').click();
      cy.wait(5000);
      cy.url().should('include', '/dashboard/services');
    });
    cy.visit('/user/company/profile');
    cy.wait(2000);
    
    //------------test

    
    cy.get('[id="profile-form-company"]').within(() => {
      
      cy.get('input[id="idCard"]').type(this.profileData.success.idCard);
      cy.get('textarea[id="aboutUs"]').type(this.profileData.success.aboutUs);
      cy.get('input[id="office"]').type(this.profileData.success.office);
      cy.get('input[id="size"]').type(this.profileData.success.size);
      cy.get('input[id="fields"]').type(this.profileData.success.fields);
      cy.get('input[id="website"]').type(this.profileData.success.website);
      cy.get('input[id="address"]').type(this.profileData.success.address);
      cy.get('input[id="city"]').type(this.profileData.success.city);
      cy.get('button[data-testid="add-location"]').click();

      

      cy.get('.react-tags__search-input').type(this.profileData.success.skill).type('{enter}');
   
      cy.get('button[data-testid="register-company-profile-button"]').click();
      
      
    });
    cy.wait(3000);
    
    cy.get('div.rnc__notification').should('be.visible')
        .invoke('text').should('include', 'Información guardada');
  });

  it('Successfuly add a new location', function () {
    //----------login
    cy.get('[id="form-login-company"]').within(() => {
      cy.get('input[data-testid="email-company"]').type(this.profileData.login.email);
      cy.get('input[data-testid="password-company"]').type(this.profileData.login.password);
      cy.get('button[data-testid="submit-company"]').click();
      cy.wait(5000);
      cy.url().should('include', '/dashboard/services');
    });
    cy.visit('/user/company/profile');
    cy.wait(2000);
    
    //------------test


    cy.get('[id="profile-form-company"]').within(() => {

      cy.get('input[id="address"]').type(this.profileData.success.address);
      cy.get('input[id="city"]').type(this.profileData.success.city);
      cy.get('button[data-testid="add-location"]').click();
      
    });
   
    cy.get('[id="profile-form-company"]').find('input').filter((index, element) => {
      return Cypress.$(element).val().includes(this.profileData.success.address);
    }).should('have.length.greaterThan', 0);
    cy.get('[id="profile-form-company"]').find('input').filter((index, element) => {
      return Cypress.$(element).val().includes(this.profileData.success.city);
    }).should('have.length.greaterThan', 0);
  });


  it('Profile update should be successful', function () {
    //----------login
    cy.get('[id="form-login-company"]').within(() => {
      cy.get('input[data-testid="email-company"]').type(this.profileData.login.email);
      cy.get('input[data-testid="password-company"]').type(this.profileData.login.password);
      cy.get('button[data-testid="submit-company"]').click();
      cy.wait(5000);
      cy.url().should('include', '/dashboard/services');
    });
    cy.visit('/user/company/profile');
    cy.wait(2000);
    
    //------------test

    cy.get('[id="profile-form-company"]').within(() => {
  
      cy.get('textarea[id="aboutUs"]').type(this.profileData.update.aboutUs);
      cy.get('input[id="office"]').type(this.profileData.update.office);
      cy.get('input[id="size"]').type(this.profileData.update.size);
      cy.get('input[id="fields"]').type(this.profileData.update.fields);
      cy.get('input[id="website"]').type(this.profileData.update.website);
      cy.get('input[id="address"]').type(this.profileData.update.address);
      cy.get('input[id="city"]').type(this.profileData.update.city);
      cy.get('button[data-testid="add-location"]').click();
    
      cy.get('.react-tags__search-input').type(this.profileData.update.skill).type('{enter}');
   
      cy.get('button[data-testid="update-company-profile-button"]').click();
      
      
    });
    cy.wait(3000);
    cy.get('div.rnc__notification').should('be.visible')
        .invoke('text').should('include', 'Información actualizada');
  });
 


});
