# Hamburgueria Express App

Este é um exemplo de aplicação Node.js utilizando o framework Express para gerenciar pedidos de uma hamburgueria.
A aplicação possui as funcionalidades de cadastro, listagem, atualização, exclusão e alteração de status de pedidos.

## Rotas

- `POST /order`: Cria um novo pedido.
- `GET /order`: Lista todos os pedidos.
- `PUT /order/:id`: Atualiza um pedido existente.
- `DELETE /order/:id`: Exclui um pedido existente.
- `GET /order/:id`: Retorna um pedido específico.
- `PATCH /order/:id`: Altera o status de um pedido para "Pronto".

## Como usar

1. Clone este repositório:

```bash
git clone https://github.com/seu-usuario/hamburgueria-express-app.git
```

2. Instale as dependências:

```bash
cd hamburgueria-express-app
npm install
```

3. Inicie o servidor:

```bash
npm start
```

4. Acesse a aplicação em `http://localhost:3000`.

## Exemplos de Requisições

- **Criar um pedido:**

```http
POST /order
Content-Type: application/json

{
  "order": "X-Salada, 2 batatas grandes, 1 coca-cola",
  "clientName": "José",
  "price": 44.50
}
```

- **Listar pedidos:**

```http
GET /order
```

- **Atualizar um pedido:**

```http
PUT /order/:id
Content-Type: application/json

{
  "order": "X-Bacon, 1 batata grande",
  "price": 28.00
}
```

- **Excluir um pedido:**

```http
DELETE /order/:id
```

- **Obter detalhes de um pedido:**

```http
GET /order/:id
```

- **Alterar status para "Pronto":**

```http
PATCH /order/:id
```

## Middlewares

- `checkOrderId`: Middleware que verifica a existência do ID do pedido antes de prosseguir com a requisição.
- Middleware de log: Registra o método e a URL de cada requisição.

## Tecnologias Utilizadas

- Node.js
- Express
- UUID
...



