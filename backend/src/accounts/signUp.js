const express = require('express');
const { MongoClient } = require('mongodb');
const router = express.Router();

const url = 'mongodb://localhost:27017';
const dbName = 'feedData';

async function conectarMongodb(){
    const client = new MongoClient(url);

    try{
        await client.connect();
        console.log('Conectado ao MongoDB com sucesso');

        const db = client.db(dbName);
        const colecao = db.collection('accounts');
        return colecao;

    }catch(error){
        console.error('Erro ao conectar ao MongoDB:', erro);
    }
}

async function signUp(nome,senha){
    
    colecao = await conectarMongodb();
    const insert = await colecao.insertOne({
        Nome:nome,
        Senha:senha
    })
   
    console.log("conta criada com sucesso:",insert);
}

const signUpHandler = router.get('/', async (req,res) => {
    
    const pNome = req.get('nome');
    const pSenha = req.get('senha');
    try{
        if(pNome && pSenha){
            await signUp(pNome,pSenha);
            res.statusCode = 200;
            res.send('Conta criada com sucesso');
        }else{
            res.statusCode = 400;
            res.send('Parametros invalidos ou faltantes.');
        }
    }catch(error){
        console.error(error);
        res.status(500).send('Erro ao criar a conta.');
    }
    
})

module.exports = signUpHandler;