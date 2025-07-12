describe('Testes de API - /users', () => {
  const baseUrl = 'http://jsonplaceholder.typicode.com/users';

  it('GET - Listar usuários', () => {
    cy.request(baseUrl).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      response.body.forEach(user => {
        expect(user).to.have.all.keys('id', 'name', 'username', 'email', 'address', 'phone', 'website', 'company');
      });
    });
  });

  it('POST - Criar novo usuário', () => {
    const newUser = {
      name: "Teste Amanda Soares",
      username: "testeAmanda",
      email: "testeAmanda@user.com"
    };

    cy.request('POST', baseUrl, newUser).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.include(newUser);
    });
  });

  it('PUT - Atualizar um usuário', () => {
    const updatedUser = {
      name: "Updated Amanda",
      username: "updatedAmanda",
      email: "updatedAmanda@user.com"
    };

    cy.request('PUT', `${baseUrl}/1`, updatedUser).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.include(updatedUser);
    });
  });

  it('DELETE - Remover um usuário', () => {
    cy.request('DELETE', `${baseUrl}/1`).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('Valida schema de um usuário', () => {
    cy.request(`${baseUrl}/1`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.jsonSchema(require('../../fixtures/user_schema.json'));
    });
  });
});
