describe('Add information to portfolio form', () => {
  let portfolio; // Define a variable to hold the portfolio fixture

  beforeEach(() => {
    cy.visit('/');
    cy.wait(50000); // Wait for user login
    cy.get('a[data-testid="portfolio-student"]').click();
    cy.wait(5000); // Wait for the profile form to load
    cy.get('[data-testid="continue-button"]').click(); // Click on continue button
    cy.wait(10000); // Wait for the page to load 
    cy.fixture('./portfolio.json').then((data) => {
      portfolio = data; // Assign the loaded portfolio fixture to the variable
    });
  });

  it('Add description should be successful', () => {
    cy.get('[data-testid="description-add"]').click(); // Click on add work experience button
    cy.wait(5000); // Wait for the modal to load
    cy.get('[class="modal-content"]').should('be.visible'); // Verify that the modal is visible
    cy.get('textarea[name="description"]').type(portfolio.description); // Type the description
    cy.wait(2000) // Wait for the description to be typed
    cy.get('[type="submit"]').click(); // Click on save button
    cy.wait(5000); // Wait for the page to load
    cy.get('div.rnc__notification').should('be.visible');
     // Verify that the notification message is correct
    cy.get('div.rnc__notification-message').invoke('text')
    .should('contain', 'Información registrada');
  }); 

  it('Add work experience empty should fail', () => {
    cy.get('[data-testid="work-experience-add"]').click(); // Click on add work experience button
    cy.wait(5000); // Wait for the modal to load
    cy.get('[class="modal-content"]').should('be.visible'); // Verify that the modal is visible
    cy.get('[type="submit"]').click(); // Click on save button
    cy.get('div.invalid-feedback')
    .should('be.visible')
    .should('have.length', 2);
  })

  it('Add work experience should be successful', () => {
    portfolio.experiences.forEach((experience) => {
      cy.get('[data-testid="work-experience-add"]').click({ force: true });
      cy.wait(5000); // Wait for the modal to load
      cy.get('[class="modal-content"]').should('be.visible'); // Verify that the modal is visible
      cy.get('div[class="react-tags"]').type(`${experience.roles}{enter}`); // Type the react-tags for role and press Enter
      cy.get('input[name="company_name"]').type(experience.company); // Type the company name
      cy.get('input[name="experience_time"]').type(experience.time); // Type the experience time
      cy.wait(2000); // Wait for the description to be typed
      cy.get('[type="submit"]').click(); // Click on save button
      cy.wait(1000); // Wait for the page to load
      cy.get('div.rnc__notification').should('be.visible');
      // Verify that the notification message is correct
      cy.get('div.rnc__notification-message').invoke('text')
      .should('contain', 'Información registrada');
    });
  });
  

  it('Add education empty should fail', () => {
    cy.get('[data-testid="education-add"]').click(); // Click on add education button
    cy.wait(5000); // Wait for the modal to load
    cy.get('[class="modal-content"]').should('be.visible'); // Verify that the modal is visible
    cy.get('[type="submit"]').click(); // Click on save button
    cy.get('div.invalid-feedback')
    .should('be.visible')
    .should('have.length', 1);
  })

  it('Add education should be successful', () => {
    portfolio.education.forEach((education) => {
      cy.get('[data-testid="education-add"]').click({ force: true });
      cy.wait(5000); // Wait for the modal to load
      cy.get('[class="modal-content"]').should('be.visible'); // Verify that the modal is visible
      cy.get('input[name="degree"]').type(education.degree); // Type the degree name
      cy.get('input[name="school"]').type(education.school); // Type the school name
      cy.wait(2000);
      cy.get('[type="submit"]').click(); // Click on save button
      cy.wait(1000); // Wait for the page to load
      cy.get('div.rnc__notification').should('be.visible');
      // Verify that the notification message is correct
      cy.get('div.rnc__notification-message').invoke('text')
      .should('contain', 'Información registrada');
    })
  })

  it('Add certifications and licenses empty should fail', () => {
    cy.get('[data-testid="certifications-add"]').click(); // Click on add certifications and licenses button
    cy.wait(5000); // Wait for the modal to load
    cy.get('[class="modal-content"]').should('be.visible'); // Verify that the modal is visible
    cy.get('[type="submit"]').click(); // Click on save button
    cy.get('div.invalid-feedback')
    .should('be.visible')
    .should('have.length', 2);
  })

  it('Add certifications and licenses should be successful', () => {
    portfolio.certifications.forEach((certification) => {
      cy.get('[data-testid="certifications-add"]').click({ force: true });
      cy.wait(5000); // Wait for the modal to load
      cy.get('[class="modal-content"]').should('be.visible'); // Verify that the modal is visible
      cy.get('input[name="name"]').type(certification.degree); // Type the certification name
      cy.get('input[name="organization"]').type(certification.school); // Type the organization name
      cy.get('[type="submit"]').click(); // Click on save button
      cy.wait(1000); // Wait for the page to load
      cy.get('div.rnc__notification').should('be.visible');
      // Verify that the notification message is correct
      cy.get('div.rnc__notification-message').invoke('text')
      .should('contain', 'Información registrada');
    });
  })

  it('Add skills empty should fail', () => {
    cy.get('[data-testid="skills-add"]').click(); // Click on add skills button
    cy.wait(5000); // Wait for the modal to load
    cy.get('[class="modal-content"]').should('be.visible'); // Verify that the modal is visible
    cy.get('[type="submit"]').click(); // Click on save button
    cy.get('div.invalid-feedback')
    .should('be.visible')
    .should('have.length', 1);
  });

  it('Add skills should be successful', () => {
    portfolio.skills.forEach((skill) => {
      cy.get('[data-testid="skills-add"]').click({ force: true });
      cy.wait(5000); // Wait for the modal to load
      cy.get('[class="modal-content"]').should('be.visible'); // Verify that the modal is visible
      cy.get('div[class="react-tags"]').type(`${skill.name}{enter}`);// Type the skill name
      cy.get('[type="submit"]').click(); // Click on save button
      cy.wait(1000); // Wait for the page to load
      cy.get('div.rnc__notification').should('be.visible');
      // Verify that the notification message is correct
      cy.get('div.rnc__notification-message').invoke('text')
      .should('contain', 'Información registrada');
    });
  });

  it('Add languages empty should fail', () => {
    cy.get('[data-testid="languages-add"]').click(); // Click on add languages button
    cy.wait(5000); // Wait for the modal to load
    cy.get('[class="modal-content"]').should('be.visible'); // Verify that the modal is visible
    cy.get('[type="submit"]').click(); // Click on save button
    cy.get('div.invalid-feedback')
    .should('be.visible')
    .should('have.length', 1);
  });

  it('Add languages should be successful', () => {
    portfolio.languages.forEach((language) => {
      cy.get('[data-testid="languages-add"]').click({ force: true });
      cy.wait(5000); // Wait for the modal to load
      cy.get('[class="modal-content"]').should('be.visible'); // Verify that the modal is visible
      cy.get('input[name="language"]').type(language.name);// Type the language name
      cy.get('[type="submit"]').click(); // Click on save button
      cy.wait(1000); // Wait for the page to load
      cy.get('div.rnc__notification').should('be.visible');
      // Verify that the notification message is correct
      cy.get('div.rnc__notification-message').invoke('text')
      .should('contain', 'Información registrada');
    });
  });
});


describe('Edit and delete information from portfolio', () => {
  let portfolio; // Define a variable to hold the portfolio fixture

  beforeEach(() => {
    cy.visit('/');
    cy.wait(50000); // Wait for user login
    cy.get('a[data-testid="portfolio-student"]').click();
    cy.wait(5000); // Wait for the profile form to load
    cy.get('[data-testid="continue-button"]').click(); // Click on continue button
    cy.wait(10000); // Wait for the page to load 
    cy.fixture('./portfolio.json').then((data) => {
      portfolio = data; // Assign the loaded portfolio fixture to the variable
    });
  });

  it('Edit description should work', () => {
    cy.get('[data-testid="description-edit"]').click({ force: true });
    cy.wait(5000); // Wait for the modal to load
    cy.get('[class="modal-content"]').should('be.visible'); // Verify that the modal is visible
    cy.get('textarea[name="description"]').clear().type(portfolio.descriptionUpdated); // Type the description
    cy.get('[type="submit"]').click(); // Click on save button
    cy.wait(1000); // Wait for the page to load
    cy.get('div.rnc__notification').should('be.visible');
  });

  it('Edit work experience should be successful', () => {
    cy.get('[data-testid="work-experience-edit"]').click({ force: true });
    cy.wait(5000); // Wait for page to load
    cy.url().should('include', 'user/student/portfolio/edit'); // Verify that the url is correct
    cy.get('[data-testid="edit-button"]').first().click({ force: true }); // Click on edit button
    cy.wait(5000); // Wait for the modal to load
    cy.get('[class="modal-content"]').should('be.visible'); // Verify that the modal is visible
    cy.get('input[name="company_name"]').clear().type(portfolio.experienceCompanyUpdated); // Type the company name
    cy.get('[type="submit"]').click(); // Click on save button
    cy.wait(5000); // Wait for the page to load
    cy.get('[data-testid="title-key"]').first().invoke('text')
    .should('contain', portfolio.experienceCompanyUpdated); // Verify that the company is updated
  });

  it('Delete work experience should be successful', () => {
    cy.get('[data-testid="work-experience-edit"]').click({ force: true });
    cy.wait(5000); // Wait for the modal to load
    cy.url().should('include', 'user/student/portfolio/edit'); // Verify that the url is correct
    cy.get('[data-testid="delete-button"]').first().click({ force: true });
    cy.wait(5000); 
    cy.get('[data-testid="title-key"]').first().invoke('text')
    .should('not.contain', portfolio.experienceCompanyUpdated);
  })
  it('Edit education should be successful', () => {
    cy.get('[data-testid="education-edit"]').click({ force: true });
    cy.wait(5000); // Wait for page to load
    cy.url().should('include', 'user/student/portfolio/edit'); // Verify that the url is correct
    cy.get('[data-testid="edit-button"]').first().click({ force: true }); // Click on edit button
    cy.wait(5000); // Wait for the modal to load
    cy.get('[class="modal-content"]').should('be.visible'); // Verify that the modal is visible
    cy.get('input[name="school"]').clear().type(portfolio.educationSchoolUpdated); // Type the school name
    cy.get('[type="submit"]').click(); // Click on save button
    cy.wait(5000); // Wait for the page to load
    cy.get('[data-testid="subtitle-key"]').first().invoke('text')
    .should('contain', portfolio.educationSchoolUpdated); // Verify that the school is updated
    
  })

  it('Delete education should be successful', () => {
    cy.get('[data-testid="education-edit"]').click({ force: true });
    cy.wait(5000); // Wait for page to load
    cy.url().should('include', 'user/student/portfolio/edit'); // Verify that the url is correct
    cy.get('[data-testid="delete-button"]').first().click({ force: true });
    cy.wait(5000); 
    cy.get('[data-testid="subtitle-key"]').first().invoke('text')
    .should('not.contain', portfolio.educationSchoolUpdated);
  })


  it('Edit certification should be successful', () => {
    cy.get('[data-testid="certifications-edit"]').click({ force: true });
    cy.wait(5000); // Wait for the modal to load
    cy.url().should('include', 'user/student/portfolio/edit'); // Verify that the url is correct
    cy.get('[data-testid="edit-button"]').first().click({ force: true }); // Click on edit button
    cy.wait(5000); // Wait for the modal to load
    cy.get('[class="modal-content"]').should('be.visible'); // Verify that the modal is visible
    cy.get('input[name="name"]').clear().type(portfolio.certificationDegreeUpdated); // Type the certification name
    cy.get('[type="submit"]').click(); // Click on save button
    cy.wait(5000); // Wait for the page to load
    cy.get('[data-testid="title-key"]').first().invoke('text')
    .should('contain', portfolio.certificationDegreeUpdated); // Verify that the certification is updated
  });

  it('Delete certification should be successful', () => {
    cy.get('[data-testid="certifications-edit"]').click({ force: true });
    cy.wait(5000); // Wait for page to load
    cy.url().should('include', 'user/student/portfolio/edit'); // Verify that the url is correct
    cy.get('[data-testid="delete-button"]').first().click({ force: true });
    cy.wait(5000); 
    cy.get('[data-testid="title-key"]').first().invoke('text')
    .should('not.contain', portfolio.certificationDegreeUpdated);
  })

  it('Edit languages should be successful', () => {
    cy.get('[data-testid="languages-edit"]').click({ force: true });
    cy.wait(5000); // Wait for the modal to load
    cy.url().should('include', 'user/student/portfolio/edit'); // Verify that the url is correct
    cy.get('[data-testid="edit-button"]').first().click({ force: true }); // Click on edit button
    cy.wait(5000); // Wait for the modal to load
    cy.get('[class="modal-content"]').should('be.visible'); // Verify that the modal is visible
    cy.get('input[name="language"]').clear().type(portfolio.languageNameUpdated); // Type the language name
    cy.get('[type="submit"]').click(); // Click on save button
    cy.wait(5000); // Wait for the page to load
    cy.get('[data-testid="title-key"]').first().invoke('text')
    .should('contain', portfolio.languageNameUpdated); // Verify that the language is updated
    
  })

  it('Delete languages should be successful', () => {
    cy.get('[data-testid="languages-edit"]').click({ force: true });
    cy.wait(5000); // Wait for page to load
    cy.url().should('include', 'user/student/portfolio/edit'); // Verify that the url is correct
    cy.get('[data-testid="delete-button"]').first().click({ force: true });
    cy.wait(5000); 
    cy.get('[data-testid="title-key"]').first().invoke('text')
    .should('not.contain', portfolio.languageNameUpdated);
  })


});