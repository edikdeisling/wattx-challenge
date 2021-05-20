describe('App', () => {
  it('App loads', () => {
    cy.visit('/');
    cy.get('app-market-overview');
    cy.get('app-header');
  });

  it('Limit value preserve', () => {
    cy.visit('/');

    cy.get('[data-test="limit-radio"][value="50"]').check();
    cy.get('[data-test="link-liquidity"]').click();
    cy.get('app-liquidity');
    cy.url().should('contain', 'liquidity?limit=50');

    cy.get('[data-test="limit-radio"][value="10"]').check();
    cy.get('[data-test="link-market-overview"]').click();
    cy.url().should('contain', '/?limit=10');
    cy.get('app-market-overview');
  });
});
