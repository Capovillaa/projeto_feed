import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

dotenv.config();

mongoose.connect(`mongodb+srv://GabrielCapovilla:${process.env.MONGO_PASSWORD}@projeto-feedapi.3ea7w.mongodb.net/?retryWrites=true&w=majority&appName=projeto-feedAPI`);

const AccountsModel = mongoose.model('Account', {
    completeName: String,
    username: String,
    password: String,
    birthDate: String
});

const router = express.Router();

async function signUp(nome,nomeUsuario,senha,data_nasc){
    const newAccount = new AccountsModel({
        completeName: nome,
        username: nomeUsuario,
        password: senha,
        birthDate: data_nasc
    });

    await newAccount.save();
    console.log("conta criada com sucesso:",newAccount);
}

export const signUpHandler = router.get('/', async (req,res) => {
    
    const pNome = req.get('nome');
    const pNomeUsuario = req.get('username');
    const pSenha = req.get('senha');
    const pbirthDate = req.get('data_nasc');

    try{
        if(pNome && pNomeUsuario && pSenha && pbirthDate){
            await signUp(pNome,pNomeUsuario,pSenha,pbirthDate);
            res.statusCode = 200;
            res.send('Conta criada com sucesso!!');
        }else{
            res.statusCode = 400;
            res.send('Parametros invalidos ou faltantes.');
        }
    }catch(error){
        console.error(error);
        res.status(500).send('Erro ao criar a conta.');
    }
    
});
