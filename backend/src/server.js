const express = require('express')
const routes = express()
const port = 3000

routes.get('/', (req, res) => {
    res.send('Hello World')
})

routes.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})