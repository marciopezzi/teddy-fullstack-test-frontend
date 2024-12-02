describe('Clients Pagination', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.get('.form-input').type('Test User');
    cy.get('.submit-button').click();

    cy.url().should('include', '/dashboard/clientes');
    cy.get('[data-cy=clients-page]').should('exist');
  });

  it('should fetch and display paginated clients', () => {
    const mockPaginatedClients = {
      data: [
        { id: 1, name: 'Client 1', salary: 5000, companyValue: 100000 },
        { id: 2, name: 'Client 2', salary: 6000, companyValue: 200000 },
      ],
      total: 2,
    };

    cy.intercept('GET', '**/clients/paginated*', {
      statusCode: 200,
      body: mockPaginatedClients,
    }).as('fetchPaginatedClients');

    cy.get('#items-per-page').select('32');

    cy.wait('@fetchPaginatedClients');

    cy.get('.client-card__title').should('have.length', 2);
    cy.get('.client-card__title').first().should('contain', 'Client 1');
    cy.get('.client-card__title').last().should('contain', 'Client 2');
  });
});
