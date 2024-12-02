describe('Client Creation Modal', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.get('.form-input').type('Test User');
    cy.get('.submit-button').click();

    cy.url().should('include', '/dashboard/clientes');
  });

  it('should open modal and create a client', () => {
    const mockClient = {
      name: 'John Doe',
      salary: 5000,
      companyValue: 1000000,
      id: 1,
    };

    cy.intercept('POST', '/clients', {
      statusCode: 201,
      body: mockClient,
    }).as('createClient');

    cy.get('[data-cy=open-create-modal]').click();

    cy.get('.modal-body').should('be.visible');

    cy.get('[data-cy=client-name]').type(mockClient.name);
    cy.get('[data-cy=client-salary]').type(mockClient.salary.toString());
    cy.get('[data-cy=client-company-value]').type(mockClient.companyValue.toString());

    cy.get('.submit-button').click();

    cy.wait('@createClient').its('response.statusCode').should('eq', 201);

    cy.get('.modal-body').should('not.exist');
  });
});
