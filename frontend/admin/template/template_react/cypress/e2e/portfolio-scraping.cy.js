import axios from 'axios';

async function decodeJwt() {
  try {
    const response = await axios.post(`${Cypress.env('REACT_APP_AUTH_BACKEND_URL')}/auth/user/decode_jwt/`, { "auth-token": localStorage.getItem("access_token") });
    return [response.data, true];
  } catch (err) {
    return [null, err];
  }
}

async function getPortfolioStudent(decodeData) {
  try {
    const response  = await axios({
      // Endpoint to send files
      url: `${Cypress.env('REACT_APP_PORTFOLIO_BACKEND_URL')}/portfolio/student/${decodeData[0]?.sub_key}/get_user/`,
      method: "GET",
      headers: {
          // Add any auth token here
          authorization: "Bearer " + localStorage.getItem("access_token"),
        },
    })
    return [response.data, true];
  } catch (error) {
    return [null, error];
  }
}


describe('Portfolio', () => {

  it('Web Scraping should work', () => {
    cy.visit('/');
    cy.wait(100000); // Wait for user login
    cy.get('a[data-testid="portfolio-student"]').click();
    cy.wait(5000);
    cy.get('[id="scraping-form"]').within(() => {
      cy.wrap(null).then(async () => {
        // Decode the jwt token
        const decodeData = await decodeJwt();
        cy.wait(10000);
        // decodeData[0]?.sub_key is the student id and should not be undefined
        expect(decodeData[0]?.sub_key).to.not.be.undefined;
        cy.wait(5000);
        // Get the portfolio student
        const [response, success] = await getPortfolioStudent(decodeData);
        cy.wait(5000);
        // Verify that the response is not null and that the scraping info is not saved
        if (response && !response?.scrapeInfoSaved && response?.isFilled && success) {
          cy.get('[data-testid="continue-button"]').click();
        }
      });
    });
    cy.get('div.rnc__notification')
    .should('be.visible')
    // Verify that the notification message is correct
    cy.get('div.rnc__notification-message').invoke('text').should('contain', 'Tenga en cuenta que Web Scraping es un proceso automatizado y puede tomar algún tiempo en completarse');
  });
});
