/// <reference types="cypress"/>
import { faker } from '@faker-js/faker';
import CadastroPage from '../support/pages/cadastro-page';

describe('Testes End To End do fluxo de cadastro e login', () => {

    /* 
    Testes End To End ou Testes de ponta a ponta, ligam uma série de funcionalidades de um sistema,
    simulando o comportamento do usuário final. Esses testes verificam se diferentes partes do sistema
    funcionam corretamente quando integradas, garantindo que o fluxo completo de uma funcionalidade
    funcione como esperado.
    Aqui iremos criar um teste end to end que cobre o fluxo de cadastro e login de um usuário em um sistema web.
    Em apenas um teste, ou seja, em um único "it", iremos:
    1. Acessar a página de cadastro.
    2. Preencher o formulário de cadastro com dados válidos.
    3. Submeter o formulário e verificar se o cadastro foi bem-sucedido.
    4. Acessar a página de login.
    5. Preencher o formulário de login com as credenciais do usuário recém-cadastrado.
    6. Submeter o formulário de login e verificar se o login foi bem-sucedido.

    Use as boas práticas aprendidas até agora para estruturar o teste.
    */

    beforeEach(() => {
        // Configurações iniciais, se necessário
    });


    it('Deve fazer o cadastro e validar o login com o usuário cadastrado', () => {
        // Criar todo o fluxo aqui dentro deste único "it"

        // Utilizando o faker para gerar dados para cadastro
        let nome = faker.person.fullName();
        let email = faker.internet.email();
        let senha = 'Senha@123';
        let telefone = '85999999978';

        // Utilizando CadastroPage para preencher o formulário de cadastro
        CadastroPage.visitarPaginaCadastro();
        CadastroPage.preencherCadastro(nome, email, telefone, senha, senha);

        // Validando cadastro com URL incluindo "dashboard"
        cy.url().should('include', 'dashboard');

        // Realizando login com as mesmas credenciais cadastradas acima
        cy.visit('login.html');
        cy.get('#email').type(email);
        cy.get('#password').type(senha);
        cy.get('#login-btn').click();

        // Validando login com URL incluindo "dashboard" e verificando se o nome do usuário aparece na interface
        cy.url().should('include', 'dashboard');
        cy.get('#user-name').should('contain', nome);

        
    });
});