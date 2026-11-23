# Controle de Treinos

Aplicação web desenvolvida com **Node.js**, **Express**, **EJS** e **MySQL** para gerenciamento de rotinas de treino. O sistema permite cadastrar, pesquisar em um catálogo pré-definido com autocompletar, editar, ordenar e excluir exercícios armazenados no banco de dados.

## Funcionalidades

- **Listagem e resumo:** exibição dos exercícios cadastrados em tabela com contagem total de itens e soma de séries.
- **Cadastro com autocompletar:** formulário para inserir exercício, grupo muscular, séries e carga (kg), com sugestões automáticas durante a digitação.
- **Catálogo rápido:** pesquisa de exercícios pré-setados por nome ou grupo muscular para preenchimento rápido do formulário.
- **Ordenação dinâmica:** ordenação dos registros por ID, exercício, grupo muscular, séries ou carga (crescente e decrescente).
- **Edição e exclusão:** atualização inline dos dados de qualquer exercício já cadastrado e remoção com confirmação.

## Tecnologias utilizadas

- **Back-end:** Node.js, Express
- **Front-end:** EJS, HTML5, CSS3, JavaScript
- **Banco de dados:** MySQL (`mysql2`)
- **Configuração:** `dotenv`

## Estrutura do projeto

```text
controle-treinos/
├── config/
│   └── db.js                 # Conexão com o banco MySQL via pool
├── public/
│   ├── javascripts/
│   │   └── catalogo.js       # Autocompletar, catálogo, ordenação e edição
│   └── stylesheets/
│       └── style.css         # Estilização da interface
├── routes/
│   └── index.js              # Rotas GET e POST (listar, cadastrar, editar e excluir)
├── views/
│   └── index.ejs             # Página principal da aplicação
├── .env.example              # Modelo das variáveis de ambiente
├── script.sql                # Script de criação do banco, tabela e dados iniciais
└── package.json
## Como executar e testar o projeto

### Pré-requisitos

Antes de começar, certifique-se de ter instalado na máquina:

- [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada)
- [MySQL Server](https://dev.mysql.com/downloads/) (ou ferramenta equivalente, como XAMPP, Laragon ou Docker)
- [Git](https://git-scm.com/)

### Passo a passo

1. **Clone o repositório e acesse a pasta do projeto**

   ```bash
   git clone https://github.com/SEU_USUARIO/controle-treinos.git
   cd controle-treinos
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Crie o banco de dados e as tabelas**

   Com o serviço do MySQL iniciado, execute o script `script.sql` para criar o banco, a estrutura e os dados iniciais:

   ```bash
   mysql -u root -p < script.sql
   ```

   > [!TIP]
   > Caso prefira, você também pode abrir o arquivo `script.sql` no MySQL Workbench, DBeaver ou no terminal interativo do MySQL e executá-lo por lá.

4. **Configure as variáveis de ambiente**

   Copie o arquivo de exemplo para criar o seu `.env`:

   ```bash
   cp .env.example .env
   ```

   *(No PowerShell do Windows, use `copy .env.example .env`)*

   Em seguida, abra o `.env` e preencha com os dados do seu ambiente MySQL:

   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=sua_senha
   DB_NAME=controle_treinos
   DB_PORT=3306
   PORT=3000
   ```

   > [!NOTE]
   > Ajuste os nomes das variáveis acima caso o seu `.env.example` utilize nomenclatura diferente.

5. **Inicie o servidor**

   ```bash
   npm start
   ```

   *(Se o seu `package.json` não tiver o script `start` configurado, rode `node app.js` ou `node ./bin/www` conforme o arquivo principal do projeto).*

6. **Abra no navegador e teste**

   Acesse `http://localhost:3000` (ou a porta definida no seu `.env`). A partir daí, você já pode:
   - Testar o autocompletar e a busca no catálogo ao digitar um exercício.
   - Cadastrar um novo exercício com grupo muscular, séries e carga.
   - Ordenar a tabela pelos cabeçalhos, editar um registro existente ou excluir um item.