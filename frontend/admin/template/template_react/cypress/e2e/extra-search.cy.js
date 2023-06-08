describe('Search vacancies with filters', () => {

  beforeEach(() => {
    cy.visit('/user/company/login');
    cy.wait(2000);
    cy.fixture('./filterVacancies.json').as('filterData')

  });

  // it('Filter by modality returns correct results', function () {
  //   //----------login
  //   cy.get('[id="form-login-company"]').within(() => {
  //     cy.get('input[data-testid="email-company"]').type(this.filterData.login.email);
  //     cy.get('input[data-testid="password-company"]').type(this.filterData.login.password);
  //     cy.get('button[data-testid="submit-company"]').click();
  //     cy.wait(5000);
  //     cy.url().should('include', '/dashboard/services');
  //   });
  //   cy.visit('/vacancies/search');
  //   cy.wait(2000);

  //   //------------test


  //   cy.get('a[id="expandDropdown"]').click();

  //   cy.get('[id="modalityDropdown"]').within(() => {

  //     cy.get('button[id="modalityButton"]').click();


  //       cy.get('[id="modalityOptions"]').find('p').filter((index, element) => {
  //         return Cypress.$(element).text().includes(this.filterData.success.modality);
  //       }).should('have.length', 1).click();

  //   });

  //   cy.get('button[id="searchButton"]').click({ force: true });
  //   cy.wait(3000);
  //   cy.get('[id="resultsList"]').find('div').filter((index, element) => {
  //     return Cypress.$(element).text().includes("Modalidad");
  //   }).each((div) => {
  //     Cypress.$(div).text().includes(this.filterData.success.modality)
  //   });

  // }); 

  // it('Filter by experience returns correct results', function () {
  //   //----------login
  //   cy.get('[id="form-login-company"]').within(() => {
  //     cy.get('input[data-testid="email-company"]').type(this.filterData.login.email);
  //     cy.get('input[data-testid="password-company"]').type(this.filterData.login.password);
  //     cy.get('button[data-testid="submit-company"]').click();
  //     cy.wait(5000);
  //     cy.url().should('include', '/dashboard/services');
  //   });
  //   cy.visit('/vacancies/search');
  //   cy.wait(2000);

  //   //------------test


  //   cy.get('a[id="expandDropdown"]').click();

  //   cy.get('[id="experienceDropdown"]').within(() => {

  //     cy.get('button[id="experienceButton"]').click();


  //       cy.get('[id="experienceOptions"]').find('p').filter((index, element) => {
  //         return Cypress.$(element).text().includes(this.filterData.success.experience);
  //       }).should('have.length', 1).click();

  //   });

  //   cy.get('button[id="searchButton"]').click({ force: true });
  //   cy.wait(3000);
  //   cy.get('[id="resultsList"]').find('div').filter((index, element) => {
  //     return Cypress.$(element).text().includes("Experiencia");
  //   }).each((div) => {
  //     Cypress.$(div).text().includes(this.filterData.success.experience)
  //   });

  // }); 


  // it('Filter by salary range returns correct results', function () {
  //   //----------login
  //   cy.get('[id="form-login-company"]').within(() => {
  //     cy.get('input[data-testid="email-company"]').type(this.filterData.login.email);
  //     cy.get('input[data-testid="password-company"]').type(this.filterData.login.password);
  //     cy.get('button[data-testid="submit-company"]').click();
  //     cy.wait(5000);
  //     cy.url().should('include', '/dashboard/services');
  //   });
  //   cy.visit('/vacancies/search');
  //   cy.wait(2000);

  //   //------------test


  //   cy.get('a[id="expandDropdown"]').click();

  //   cy.get('input[id="salaryMinimum"]').type(this.filterData.success.salaryMinimum);
  //   cy.get('input[id="salaryMaximum"]').type(this.filterData.success.salaryMaximum);

  //   cy.get('button[id="searchButton"]').click({ force: true });
  //   cy.wait(3000);

  //   cy.get('[id="resultsList"]').find('.result-item').each((div) => {
  //     cy.wrap(div).click({ force: true });

  //     cy.get('div[id="currentVacancy"]').within(() => {
  //       cy.get('div[id="currentSalary"]').then(($div) => {

  //         const text = $div.text();
  //         const salaryText = text.replace("Salario: $ ", "").trim().replaceAll(",","");
  //         console.log(salaryText)
  //         const salaryNumber = Number(salaryText);

  //         // Perform the comparison with the range
  //         const minRange = this.filterData.success.salaryMinimum;
  //         const maxRange = this.filterData.success.salaryMaximum;
  //         expect(salaryNumber).to.be.within(minRange, maxRange);


  //       })


  //     });


  //   });

  // }); 

  // it('Filter by date range where min salary is greater than max salary should show no results', function () {
  //   //----------login
  //   cy.get('[id="form-login-company"]').within(() => {
  //     cy.get('input[data-testid="email-company"]').type(this.filterData.login.email);
  //     cy.get('input[data-testid="password-company"]').type(this.filterData.login.password);
  //     cy.get('button[data-testid="submit-company"]').click();
  //     cy.wait(5000);
  //     cy.url().should('include', '/dashboard/services');
  //   });
  //   cy.visit('/vacancies/search');
  //   cy.wait(2000);

  //   //------------test


  //   cy.get('a[id="expandDropdown"]').click();

  //   cy.get('input[id="salaryMinimum"]').type(this.filterData.error1.salaryMinimum);
  //   cy.get('input[id="salaryMaximum"]').type(this.filterData.error1.salaryMaximum);

  //   cy.get('button[id="searchButton"]').click({ force: true });
  //   cy.wait(3000);

  //   cy.get('[id="resultsList"]').find('.result-item').should('have.length', 0)

  // }); 


  // it('Filter by salary range where both salary boundaries are equal should show correct results', function () {
  //   //----------login
  //   cy.get('[id="form-login-company"]').within(() => {
  //     cy.get('input[data-testid="email-company"]').type(this.filterData.login.email);
  //     cy.get('input[data-testid="password-company"]').type(this.filterData.login.password);
  //     cy.get('button[data-testid="submit-company"]').click();
  //     cy.wait(5000);
  //     cy.url().should('include', '/dashboard/services');
  //   });
  //   cy.visit('/vacancies/search');
  //   cy.wait(2000);

  //   //------------test


  //   cy.get('a[id="expandDropdown"]').click();

  //   cy.get('input[id="salaryMinimum"]').type(this.filterData.success2.salaryMinimum);
  //   cy.get('input[id="salaryMaximum"]').type(this.filterData.success2.salaryMaximum);

  //   cy.get('button[id="searchButton"]').click({ force: true });
  //   cy.wait(3000);

  //   cy.get('[id="resultsList"]').find('.result-item').each((div) => {
  //     cy.wrap(div).click({ force: true });

  //     cy.get('div[id="currentVacancy"]').within(() => {
  //       cy.get('div[id="currentSalary"]').then(($div) => {

  //         const text = $div.text();
  //         const salaryText = text.replace("Salario: $ ", "").trim().replaceAll(",","");
  //         console.log(salaryText)
  //         const salaryNumber = Number(salaryText);

  //         // Perform the comparison with the range
  //         const minRange = this.filterData.success2.salaryMinimum;
  //         const maxRange = this.filterData.success2.salaryMaximum;
  //         expect(salaryNumber).to.be.within(minRange, maxRange);


  //       })


  //     });


  //   });

  // }); 



  // it('Salary range should not accept negative numbers', function () {
  //   //----------login
  //   cy.get('[id="form-login-company"]').within(() => {
  //     cy.get('input[data-testid="email-company"]').type(this.filterData.login.email);
  //     cy.get('input[data-testid="password-company"]').type(this.filterData.login.password);
  //     cy.get('button[data-testid="submit-company"]').click();
  //     cy.wait(5000);
  //     cy.url().should('include', '/dashboard/services');
  //   });
  //   cy.visit('/vacancies/search');
  //   cy.wait(2000);

  //   //------------test


  //   cy.get('a[id="expandDropdown"]').click();

  //   cy.get('input[id="salaryMinimum"]').type(this.filterData.error2.salaryMinimum);
  //   cy.get('input[id="salaryMaximum"]').type(this.filterData.error2.salaryMaximum);

  //   const min = Number(this.filterData.error2.salaryMinimum.toString().replace("-", ""))
  //   const max = Number(this.filterData.error2.salaryMaximum.toString().replace("-", ""))

  //   cy.get('input[id="salaryMinimum"]').then((input) => {

  //     const value = input.val();
  //     const salaryText = value.replace("$ ", "").trim().replaceAll(",","");
  //     const salaryNumber = Number(salaryText);

  //     expect(salaryNumber).to.eql(min)

  //   })

  //   cy.get('input[id="salaryMaximum"]').then((input) => { 

  //     const value = input.val();
  //     const salaryText = value.replace("$ ", "").trim().replaceAll(",","");
  //     const salaryNumber = Number(salaryText);

  //     expect(salaryNumber).to.eql(max)

  //   })


  // }); 



  // it('Salary range should not accept text', function () {
  //   //----------login
  //   cy.get('[id="form-login-company"]').within(() => {
  //     cy.get('input[data-testid="email-company"]').type(this.filterData.login.email);
  //     cy.get('input[data-testid="password-company"]').type(this.filterData.login.password);
  //     cy.get('button[data-testid="submit-company"]').click();
  //     cy.wait(5000);
  //     cy.url().should('include', '/dashboard/services');
  //   });
  //   cy.visit('/vacancies/search');
  //   cy.wait(2000);

  //   //------------test


  //   cy.get('a[id="expandDropdown"]').click();

  //   cy.get('input[id="salaryMinimum"]').type(this.filterData.error3.salaryMinimum);
  //   cy.get('input[id="salaryMaximum"]').type(this.filterData.error3.salaryMaximum);

  //   cy.get('input[id="salaryMinimum"]').should('have.value', '$ 0');
  //   cy.get('input[id="salaryMaximum"]').should('have.value', '$ 0');

  // }); 



  it('Filter by date range should show correct results', function () {
    //----------login
    cy.get('[id="form-login-company"]').within(() => {
      cy.get('input[data-testid="email-company"]').type(this.filterData.login.email);
      cy.get('input[data-testid="password-company"]').type(this.filterData.login.password);
      cy.get('button[data-testid="submit-company"]').click();
      cy.wait(5000);
      cy.url().should('include', '/dashboard/services');
    });
    cy.visit('/vacancies/search');
    cy.wait(2000);

    //------------test


    cy.get('a[id="expandDropdown"]').click();


    cy.get('input[id="dateMinimum"]').type(this.filterData.success.dateMinimum);
    cy.get('input[id="dateMaximum"]').type(this.filterData.success.dateMaximum);

    cy.get('button[id="searchButton"]').click({ force: true });
    cy.wait(3000);

    cy.get('[id="resultsList"]').find('.result-item').each((div) => {
      cy.wrap(div).click({ force: true });

      cy.get('div[id="currentVacancy"]').within(() => {
        cy.get('p[id="currentPublishDate"]').then(($p) => {

          let text = $p.text();

          const dateRegex = /\d{4}-\d{2}-\d{2}/;
          const match = text.match(dateRegex);
          

          const formatDate = (value) => {

            const date = new Date(value);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            return formattedDate
        
          }
 
          let extractedDate = match[0];
          const minRange = formatDate(this.filterData.success.dateMinimum);
          const maxRange = formatDate(this.filterData.success.dateMaximum);
          expect(extractedDate).to.satisfy((date) => date >= minRange && date <= maxRange);


        })


      });


    });

  });


  it('Filter by date range with min date greater than max date shows no results', function () {
    //----------login
    cy.get('[id="form-login-company"]').within(() => {
      cy.get('input[data-testid="email-company"]').type(this.filterData.login.email);
      cy.get('input[data-testid="password-company"]').type(this.filterData.login.password);
      cy.get('button[data-testid="submit-company"]').click();
      cy.wait(5000);
      cy.url().should('include', '/dashboard/services');
    });
    cy.visit('/vacancies/search');
    cy.wait(2000);

    //------------test


    cy.get('a[id="expandDropdown"]').click();


    cy.get('input[id="dateMinimum"]').type(this.filterData.error1.dateMinimum);
    cy.get('input[id="dateMaximum"]').type(this.filterData.error1.dateMaximum);

    cy.get('button[id="searchButton"]').click({ force: true });
    cy.wait(3000);

    cy.get('[id="resultsList"]').find('.result-item').should('have.length', 0)

  });





});
