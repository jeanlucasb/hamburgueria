const express = require("express");
const uuid = require("uuid"); // Pacote para gerar IDs únicos

const port = 3000;
const app = express();
app.use(express.json());// Habilita o uso de JSON nas requisições
const orders = [];

// Middleware para verificar se o ID do pedido existe
const verifyOrderId = (req, res, next) => {
    //  verifyOrderId => verificar o ID do pedido
    const { id } = req.params;

    // Validar o ID do pedido
    if (!id) {
        res.status(400).json({ erro: "Missing Order ID" }); //ID do pedido ausente
        return;
    }

    // Buscar o pedido no banco de dados
    const orderIndex = orders.findIndex((order) => order.id === id);

    // Se o pedido não existir, retornar um erro
    if (orderIndex === -1) {
        res.status(404).json({ erro: "Order not found" });  //Pedido não encontrado
        return;
    }

    // Armazenar informações para uso posterior na rota
    req.orderIndex = orderIndex;
    req.userId = id;

    // Se o pedido existir, prosseguir para a próxima rota
    next();
};

// Middleware para log de requisição
const requestLogger = (req, res, next) => {
    console.log(`[${req.method}] - ${req.url}`);
    next();
};

app.use(requestLogger);


// Rota para criar um pedido
app.post("/order", (req, res) => {
    const { order, clienteName, price } = req.body;

    // Criar um novo pedido com ID gerado por UUID
    const user = {
        id: uuid.v4(),
        order,
        clienteName,
        price,
        status: "Em preparação"
    };

    // Adicionar o pedido ao banco de dados
    orders.push(user);

    // Retornar o pedido criado
    return res.status(201).json(orders);
});

// Rota para buscar todos os pedidos
app.get("/order", (req, res) => {
    return res.json(orders);
});

// Rota para atualizar um pedido
app.put("/order/:id", verifyOrderId, (req, res) => {
    const { order, clienteName, price } = req.body;


    // Validar os dados do pedido
    if (order !== undefined && clienteName !== undefined && price !== undefined) {
        // Atualizar o pedido no banco de dados
        const index = res.orderIndex
        const updateOrder = { id: req.userId, order, clienteName, price };
        orders[req.orderIndex] = updateOrder;
        return res.json(updateOrder);
    } else {
        return res.status(400).json({ error: "Missing order details" });
    }

});

// Rota para excluir um pedido
app.delete("/order/:id", verifyOrderId, (req, res) => {
    const orderIndex = req.orderIndex;
    orders.splice(orderIndex, 1);
    return res.status(204).send();
});

// Rota para buscar um pedido específico
app.get("/order/:id", verifyOrderId, (req, res) => {
    const orderIndex = req.orderIndex;
    return res.json(orders[orderIndex]);

});

// Rota para atualizar o status de um pedido para "Pronto"
app.patch("/order/:id", verifyOrderId, (req, res) => {
    const orderIndex = req.orderIndex;

    // Atualizar o status do pedido para "Pronto"
    orders[orderIndex].status = "Pronto";
    return res.json(orders[orderIndex]);

});


// Inicia o servidor na porta especificada
app.listen(port, () => {
    console.log(`🧠Server started on port ${port}`);
});
