describe('Edit Profile', () => {
  beforeEach(() => {
    // @ts-ignore
    cy.login('test_client_523@account.com', 'test_client_523');
  });
  it('check go to edit-profile page', () => {
    // @ts-ignore
    cy.get('a[href="/edit-profile"]').click();
    cy.wait(2000);
    cy.title().should('eq', 'Edit Profile | D-liver');
  });
  it('check change email', () => {
    cy.intercept('POST', 'http://localhost:4000/graphql', (req) => {
      if (req.body?.operationName === 'editProfile') {
        // @ts-ignore
        req.body?.variables?.input?.email = 'test_client_523@account.com';
      }
    });
    cy.visit('/edit-profile');
    cy.findByPlaceholderText(/email/i)
      .clear()
      .type('test_client_523@account.com');
    cy.findByRole('button').click();
  });
});
