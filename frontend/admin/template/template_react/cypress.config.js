const { defineConfig } = require("cypress");
const {GoogleSocialLogin} = require('cypress-social-logins').plugins


module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        GoogleSocialLogin: GoogleSocialLogin,
      });
    },
    baseUrl: "http://localhost:3000",
    chromeWebSecurity: false,
  },
  env: {
    REACT_APP_AUTH_BACKEND_URL: 'http://localhost:8000/fs-uv',
    REACT_APP_PORTFOLIO_BACKEND_URL: 'http://localhost:8002',
    REACT_APP_COMPANY_BACKEND_URL: 'http://localhost:8001/fs-uv',
  },
});
