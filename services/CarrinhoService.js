import mongoose from "mongoose"

import carrinho from "../models/Carrinho.js"
import ProdutoService from "./ProdutoService.js";

const Carrinho = mongoose.model("Carrinho", carrinho)

//responsavel pelos metodos fazer o crud
class CarrinhoService{
    //Função para cadastrar no banco
    Create(idProduto) {
        const newCarrinho = new Carrinho({
            idProduto: idProduto,
            userId:1
        })
        newCarrinho.save() //criação de dados
    }

    async GetAll()   {

        const itensDoCarrinho = await Carrinho.find({ userId: 1 });

        const produtoIds = itensDoCarrinho.map((item) => item.idProduto);

        const produtosNoCarrinho = await ProdutoService.GetCarrinhoItens(produtoIds);

        return produtosNoCarrinho;
    }

   async delete(){
       await Carrinho.deleteMany({ userId: 1 });
   }

}

export default new CarrinhoService()