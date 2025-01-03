import express from 'express';
import { signUpHandler } from './accounts/signUp.js';

const server = express();
const port = 3000;


server.get('/', (req, res) => {
    res.statusCode = 403;
    console.log('Rota default nao permitida');
    res.send("Acesso negado")
})

server.use('/signUp',signUpHandler);

server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})