describe('List users', () => {
  beforeEach(() => {
    // Limpar a base de dados ou configurar o backend para garantir que o estado de cada teste seja conhecido
    cy.request('POST', 'http://localhost:5000/api/users/reset'); // Exemplo: resetando o banco de dados antes de cada teste

    // Visitar a URL onde o painel administrativo está sendo servido
    cy.visit('http://localhost:3000/#/users'); // Altere se necessário para a URL correta
  });

  it('should show "No users yet." if there are no users', () => {
    // Verifica se a mensagem "No users yet." aparece quando não há usuários
    cy.contains('No users yet.').should('be.visible');
  });

  it('should list users if they exist', () => {
    // Supondo que você já tenha um usuário no banco de dados
    cy.request('POST', 'http://localhost:5000/api/users', {
      name: 'Paloma20',
      email: 'paloma20@test.com',
      password: '123456',
    });
    // Verifica se o usuário foi listado
    cy.contains('Paloma20').should('be.visible');
    cy.contains('paloma20@test.com').should('be.visible');
  });
});

describe('Create a new user', () => {
  it('should create a new user and validate in the database', () => {
    // Visite a página de criação de usuário
    cy.visit('http://localhost:3000/#/users/create');

    // Preencha os campos do formulário
    cy.get('input[name="name"]').type('Paloma30');
    cy.get('input[name="email"]').type('paloma30@test.com');
    cy.get('input[name="password"]').type('123456');

    // Pressione "Enter" para enviar o formulário
    cy.get('input[name="name"]').type('{enter}');

    // Aguarde o redirecionamento e valide que o novo usuário aparece na listagem
    cy.visit('http://localhost:3000/#/users');
    cy.contains('Paloma30').should('be.visible');
    cy.contains('paloma30@test.com').should('be.visible');
  });
});

describe('User Edit Tests', () => {
  beforeEach(() => {
    // Limpar a base de dados ou configurar o backend para garantir que o estado de cada teste seja conhecido
    cy.request('POST', 'http://localhost:5000/api/users/reset'); // Exemplo: resetando o banco de dados antes de cada teste

    // Visitar a URL onde o painel administrativo está sendo servido
    cy.visit('http://localhost:3000/#/users'); // Altere se necessário para a URL correta
  });

  it('Deve editar um usuário existente', () => {
    // Criar um usuário
    cy.contains('No users yet.').should('be.visible');
    cy.contains('Create').click();

    cy.get('input[name="name"]').type('Paloma40');
    cy.get('input[name="email"]').type('paloma40@test.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('input[name="name"]').type('{enter}');

    // Esperar o usuário ser adicionado
    cy.contains('Paloma40').should('be.visible');

    // Editar o usuário
    cy.contains('Edit').click();
    cy.get('input[name="name"]').clear().type('Paloma60');
    cy.contains('Save').click();

    // Verificar se o nome foi atualizado
    cy.contains('Paloma60').should('be.visible');
  });

  it('Deve cancelar a edição do usuário', () => {
    // Criar um usuário
    cy.contains('No users yet.').should('be.visible');
    cy.contains('Create').click();

    cy.get('input[name="name"]').type('Paloma40');
    cy.get('input[name="email"]').type('paloma40@test.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('input[name="name"]').type('{enter}');

    // Esperar o usuário ser adicionado
    cy.contains('Paloma40').should('be.visible');

    // Editar o usuário
    cy.contains('Edit').click();
    cy.get('input[name="name"]').clear().type('Paloma60');
    cy.contains('Save').click();
    cy.contains('Undo').click();

    // Verificar se o nome não foi alterado
    cy.contains('Paloma40').should('be.visible');
  });
});

describe('User Removal', () => {
  beforeEach(() => {
    // Limpar a base de dados ou configurar o backend para garantir que o estado de cada teste seja conhecido
    cy.request('POST', 'http://localhost:5000/api/users/reset'); // Exemplo: resetando o banco de dados antes de cada teste

    // Visitar a URL onde o painel administrativo está sendo servido
    cy.visit('http://localhost:3000/#/users'); // Altere se necessário para a URL correta
  });

  it('should remove a user from the database', () => {
    // Criar um usuário
    cy.contains('No users yet.').should('be.visible');
    cy.contains('Create').click();

    cy.get('input[name="name"]').type('Paloma50');
    cy.get('input[name="email"]').type('paloma50@test.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('input[name="name"]').type('{enter}');

    // Esperar o usuário ser adicionado
    cy.contains('Paloma50').should('be.visible');

    // Encontrar e clicar no botão de exclusão
    cy.contains('Paloma50')
      .closest('tr') // Encontra a linha da tabela
      .find('[aria-label="delete-user"]') // Agora busca o botão dentro dessa linha
      .click();

    // Verifique se o usuário foi removido
    cy.contains('Paloma50').should('not.exist');
  });

  it('should cancel user removal', () => {
    // Criar um usuário
    cy.contains('No users yet.').should('be.visible');
    cy.contains('Create').click();

    cy.get('input[name="name"]').type('Paloma60');
    cy.get('input[name="email"]').type('paloma60@test.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('input[name="name"]').type('{enter}');

    // Esperar o usuário ser adicionado
    cy.contains('Paloma60').should('be.visible');

    // Encontrar e clicar no botão de exclusão
    cy.contains('Paloma60')
      .closest('tr') // Encontra a linha da tabela
      .find('[aria-label="delete-user"]') // Agora busca o botão dentro dessa linha
      .click();

    // Clicar no botão de cancelamento
    cy.contains('Undo').click();

    // Verificar se o usuário ainda está na lista
    cy.contains('Paloma60').should('be.visible');
  });
});
