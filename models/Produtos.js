import mongoose from 'mongoose'


//estrutura de dados do nosso banco de dados, os atributos 
const produto = new mongoose.Schema({
    nome: String,
    preco: Number, 
    categoria:String,
    qtd: Number,
    unidade: String,
    img: String,
    pescador: String
})

export default produto