import mongoose from 'mongoose'


//estrutura de dados do nosso banco de dados, os atributos 
const carrinho = new mongoose.Schema({
    idProduto: String,
    userId: String
})

export default carrinho