# Projeto Hash

Projeto de estudo em Node.js que simula um sistema simples de cadastro e login pelo terminal. As senhas informadas pelo usuário não são salvas diretamente: elas são transformadas em hash usando a biblioteca `bcrypt` antes de serem armazenadas em um arquivo JSON.

> Este projeto foi desenvolvido para praticar entrada de dados no terminal, leitura e escrita de arquivos, módulos ES, funções assíncronas e armazenamento seguro de senhas.

## Funcionalidades

- Cadastro de usuário com e-mail e senha.
- Validação simples do e-mail, verificando se ele contém `@`.
- Geração de hash da senha com `bcrypt` e fator de custo `10`.
- Persistência dos usuários no arquivo `dados.json`.
- Login por e-mail e senha.
- Comparação da senha informada com o hash salvo, sem precisar recuperar a senha original.
- Mensagens para e-mail inválido, usuário não cadastrado, senha incorreta e login realizado com sucesso.

## Tecnologias utilizadas

- [Node.js](https://nodejs.org/)
- JavaScript com módulos ES (`import`/`export`)
- [`bcrypt`](https://www.npmjs.com/package/bcrypt): geração e comparação de hashes de senha.
- [`prompt-sync`](https://www.npmjs.com/package/prompt-sync): leitura de respostas no terminal.
- `fs`: leitura e escrita do arquivo local de usuários.
- JSON: formato utilizado para persistir os dados.

## Pré-requisitos

- Node.js instalado, preferencialmente uma versão LTS.
- npm, que normalmente é instalado junto com o Node.js.

Para conferir se estão instalados:

```bash
node --version
npm --version
```

## Como executar

1. Clone o repositório e entre na pasta do projeto:

   ```bash
   git clone https://github.com/thiagohhh/PROJETO-HASH.git
   cd PROJETO-HASH
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o programa:

   ```bash
   node script.js
   ```

O programa exibirá duas opções:

```text
Fazer Cadastro: 1
Fazer Login: 2
```

## Fluxo de cadastro

Ao escolher `1`, o programa:

1. Solicita o e-mail e a senha.
2. Confere se o e-mail contém `@`.
3. Lê os usuários existentes em `dados.json`.
4. Gera um hash da senha com `bcrypt`.
5. Adiciona o novo usuário à lista.
6. Salva a lista atualizada no arquivo JSON.

Um registro salvo tem esta estrutura:

```json
[
  {
    "email": "exemplo@email.com",
    "senha": "$2b$10$..."
  }
]
```

O valor do campo `senha` é um hash. A senha original não é gravada no arquivo.

## Fluxo de login

Ao escolher `2`, o programa:

1. Solicita o e-mail e a senha.
2. Valida se o e-mail contém `@`.
3. Procura o usuário pelo e-mail em `dados.json`.
4. Compara a senha informada com o hash usando `bcrypt.compare`.
5. Exibe uma mensagem de sucesso ou informa se o usuário não existe ou se a senha está incorreta.

## Estrutura do projeto

```text
.
├── dados.json       # Armazenamento local dos usuários
├── package.json     # Metadados e dependências do projeto
├── package-lock.json# Versões exatas das dependências instaladas
├── script.js        # Código principal do cadastro e login
└── README.md        # Documentação do projeto
```

## Observações e limitações

Este é um projeto educacional e não deve ser usado como sistema de autenticação em produção. Entre as limitações atuais estão:

- O banco de dados é um arquivo JSON local, sem controle de concorrência.
- Não há verificação para impedir o cadastro de e-mails repetidos.
- A validação do e-mail é intencionalmente simples.
- A senha é digitada normalmente no terminal e pode ficar visível durante a entrada.
- Não há sessão, token, recuperação de senha ou interface gráfica.
- O caminho de `dados.json` depende da pasta em que o comando é executado.

Como evolução, o projeto poderia validar melhor os dados, impedir duplicidades, ocultar a senha no terminal e utilizar um banco de dados com uma API de autenticação.

## Licença

Este projeto usa a licença ISC, conforme definido no `package.json`.
