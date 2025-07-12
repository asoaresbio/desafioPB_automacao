describe('Desafio Parana banco - heroku app', () => {
  beforeEach(() => {
    cy.visit('https://the-internet.herokuapp.com/challenging_dom');
  });

  it('Clica nos três botões (azul, vermelho, verde)', () => {
    cy.get('.button').eq(0).click({ force: true }); // botão azul
    cy.get('.button').eq(1).click({ force: true }); // botão vermelho
    cy.get('.button').eq(2).click({ force: true }); // botão verde

  });

  it('Clica em todos os botões "Edit" da tabela', () => {
    cy.get('table tbody tr').each(($row) => {
      cy.wrap($row)
        .find('a')
        .contains(/^edit$/i) // Expressão para evitar confusão com textos parecidos
        .click({ force: true });
    });
  });

  it('Clica em todos os botões "Delete" da tabela', () => {
    cy.get('table tbody tr').each(($row) => {
      cy.wrap($row)
        .find('a')
        .contains(/^delete$/i)
        .click({ force: true });
    });
  });
});
