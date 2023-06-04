describe('Login OAuth', () => {

  it('Login should be successful', () => {
    Cypress.Commands.add('userLoginWithGmail', () => {
      cy.fixture('./login-student.json').then((loginData) => {
        const socialLoginOptions = {
          username: loginData.email,
          password: loginData.password,
          headless: false,
          logs: true,
          loginUrl: 'http://localhost:3000/user/univalle/login',
          loginSelector: '[aria-labelledby="button-label"]',
          isPopup: true,
          popupDelay: 10000,
          cookieDelay: 2000,
          getAllBrowserCookies: true,
          waitForSelector: '[aria-labelledby="button-label"]',
        };
        return cy.task('GoogleSocialLogin', socialLoginOptions, { timeout: 120000 })
        .then(({cookies}) => {
          cy.clearCookies()
          cy.wait(10000);
          cy.iframe('iframe[id="gsi_455349_352391"]').within(() => {
            cy.get('[aria-labelledby="button-label"]').click();
          });
          cy.wait(10000);
          cookies.map((cookie) => {
            cy.setCookie(cookie.name, cookie.value, {
                domain: cookie.domain,
                expiry: cookie.expires,
                httpOnly: cookie.httpOnly,
                path: cookie.path,
                secure: cookie.secure
              })
              Cypress.Cookies.defaults({
                preserve: cookie.name
              })
            })
            cy.window().then(window => {
              Object.keys(ssd).forEach(key => window.sessionStorage.setItem(key, ssd[key]))
              Object.keys(lsd).forEach(key => window.localStorage.setItem(key, lsd[key]))
            })
            cy.log('login successful.')
            cy.visit('http://localhost:3000/')
        })      
      });
    });
    cy.userLoginWithGmail();
  }); 
  it('Login should fail', () => {
  })
}); 



