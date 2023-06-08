describe('Password', () => {

    it('Change password should fail', () => {
        cy.visit('/request_password_recovery/')
        cy.get('input[type="text"]').type('admin@gmail.com')
        cy.get('button[type="submit"]').click()
        cy.wait(5000)
        cy.get('div.invalid-feedback').should('be.visible').invoke('text').should('equal', 'El correo no coincide con ninguna cuenta');
    })

    it('Change password should be successful', () => {
        cy.visit('/request_password_recovery/')
        cy.get('input[type="text"]').type('melissa.gonzalez@correounivalle.edu.co')
        cy.get('button[type="submit"]').click()
        cy.wait(8000) // Wait for the email to be sent
        cy.get('div.rnc__notification').should('be.visible')
    })

});