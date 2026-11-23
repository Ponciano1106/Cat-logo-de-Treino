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