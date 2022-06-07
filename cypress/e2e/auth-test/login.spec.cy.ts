describe('Login', () => {
  it('cheeck ! go to Login page', () => {
    cy.visit('').title().should('eq', 'Login | D-liver');
  });
  it('check email & password validation erros', () => {
    cy.visit('');
    cy.findByPlaceholderText(/email/i).type('wrong@mail');
    cy.findByRole('alert').should('have.text', 'Please enter a valid email');
    cy.findByPlaceholderText(/email/i).clear();
    cy.findByRole('alert').should('have.text', 'Email is required');
    cy.findByPlaceholderText(/email/i).type('wrong@mail.com');
    cy.findByPlaceholderText(/password/i)
      .type('a')
      .clear();
    cy.findByRole('alert').should('have.text', 'Password is required');
  });
  it('check fill the form', () => {
    cy.login('test_client_523@account.com', 'test_client_523');
  });
});
