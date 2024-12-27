const express = require('express');

const server = express();
const port = 3000;

const signUpRouter = require('./accounts/signUp')

server.get('/', (req, res) => {
    res.statusCode = 403;
    console.log('Rota default nao permitida');
})

server.use('/signUp',signUpRouter);

server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})