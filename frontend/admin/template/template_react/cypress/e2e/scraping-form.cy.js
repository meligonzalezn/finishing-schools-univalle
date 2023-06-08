describe('Edit profile form company', () => {
  
  beforeEach(() => {
    cy.visit('/user/univalle/login');
    cy.wait(50000);
    cy.fixture('./studentProfile.json').as('profileData')

  });

  // it('Student profile register with empty strictly required fields should show warnings', function () {

  //   cy.visit('/user/student/profile');
  //   cy.wait(2000);
  //   cy.get('button[id="saveButton"]').click();
    
  //   cy.get('div.invalid-feedback')
  //     // Verify that the warnings are visible
  //     .should('be.visible')
  //      // Should be 1 because there is 1 field strictly required 
  //     .should('have.length', 2)
  //     .invoke('text').should('include', 'Campo obligatorio');
   

  // }); 

  // it('Continue button without having saved profile shouldnt work', function () {

  //   cy.visit('/user/student/profile');
  //   cy.wait(2000);
  //   cy.get('button[id="continueButton"]').click({force: true});

  //   cy.wait(2000);
  //   cy.url().should('include', '/user/student/profile');
    

  // }); 

  it('student profile register should be successful', function () {

    cy.visit('/user/student/profile');
    cy.wait(2000);
    
    cy.get('[id="profile-form-student"]').within(() => {
      
      cy.get('input[id="idCard"]').type(this.profileData.success.idCard);
      cy.get('input[id="issueDate"]').type(this.profileData.success.issueDate);
      cy.get('input[id="githubProfile"]').type(this.profileData.success.githubProfile);
      cy.get('input[id="gitlabProfile"]').type(this.profileData.success.gitlabProfile);
      cy.get('input[id="linkedinProfile"]').type(this.profileData.success.linkedinProfile);
      cy.get('input[id="phoneNumber"]').type(this.profileData.success.phoneNumber);


      cy.get('button[id="saveButton"]').click();

    });
    cy.wait(3000);
    
    cy.get('div.rnc__notification').should('be.visible')
        .invoke('text').should('include', 'Información guardada');
  });


  it('student profile update should be successful', function () {

    cy.visit('/user/student/profile');
    cy.wait(2000);
  
    cy.get('[id="profile-form-student"]').within(() => {
  
      cy.get('input[id="githubProfile"]').type(this.profileData.success2.githubProfile);
      cy.get('input[id="gitlabProfile"]').type(this.profileData.success2.gitlabProfile);
      cy.get('input[id="phoneNumber"]').type(this.profileData.success2.phoneNumber);


      cy.get('button[id="updateButton"]').click();
      
    });
    cy.wait(3000);
    cy.get('div.rnc__notification').should('be.visible')
        .invoke('text').should('include', 'Información actualizada');
  });
 

  it('phone number field should not accept text', function () {

    cy.visit('/user/student/profile');
    cy.wait(2000);
  
    cy.get('[id="profile-form-student"]').within(() => {
  
      cy.get('input[id="number"]').type(this.profileData.error.number);
      cy.get('input[id="number"]').should('have.value', '');
      
    });
  });


});
