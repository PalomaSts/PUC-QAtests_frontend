# PUC-QAtests Frontend - User Management Interface

Este projeto consiste em uma interface administrativa desenvolvida com React Admin, focada na gestão de usuários. Ele também inclui testes automatizados utilizando Cypress para validar funcionalidades do sistema.

## Funcionalidades

- **Listagem de usuários**:
  - Exibir uma lista de usuários cadastrados.
  - Exibir a mensagem "No users yet." quando não houver usuários.
- **Criação de usuários**:
  - Formulário para adicionar novos usuários.
- **Edição de usuários**:
  - Alterar os dados de um usuário existente.
  - Desfazer alterações utilizando um botão de "Undo".
- **Remoção de usuários**:
  - Excluir usuários do banco de dados.
  - Desfazer a remoção utilizando um botão de "Undo".

## Tecnologias Utilizadas

- **Frontend**: React Admin, React
- **Backend**: Node.js (simulação com API local usando `axios`)
- **Testes**: Cypress
- **Gerenciamento de estado**: React Hooks (`useState`, `useEffect`)

## Requisitos para Execução

- Node.js (v14 ou superior)
- NPM ou Yarn
- Projeto backend https://github.com/PalomaSts/PUC-QAtests_backend.git

## Como Rodar o Projeto

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/PalomaSts/PUC-QAtests_frontend.git
   cd PUC-QAtests_frontend
   ```

2. **Instale as dependências**:

   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Inicie o servidor local**:

   ```bash
   npm start
   # ou
   yarn start
   ```

   O projeto estará disponível em [http://localhost:3000](http://localhost:3000).

4. **Configure o backend**:

   Certifique-se de que o backend esteja rodando na porta 5000 e forneça os endpoints:

   - `GET /api/users` para listar usuários
   - `POST /api/users` para criar usuários
   - `PUT /api/users/:id` para editar usuários
   - `DELETE /api/users/:id` para remover usuários

## Como Rodar os Testes

1. **Inicie os servidores locais**:
   Certifique-se de que o frontend e o backend estejam rodando.

2. **Execute os testes do Cypress**:

   ```bash
   npx cypress open
   ```

   Escolha o teste desejado e execute no ambiente do Cypress.

## Estrutura de Diretórios Principais

```plaintext
src/
├── components/
│   ├── UserList.js
│   ├── UserEdit.js
│   └── UserCreate.js
└── App.js

cypress/
├── e2e/
│   └──user-management.cy.js

```

## **Observações**

- **Testes cypress**:  
  Os testes foram realizados executando o Cypress a parte e encontrando o projeto via interface do Cypress.

- **Backend**:  
  Não se esqueça de baixar o projeto do backend, criar o arquivo .env com as informações do seu banco e deixar o projeto rodando antes de começar a rodar o front.

---

Obrigada por dar uma olhada no meu projeto! 😊
