import mongoose from "mongoose"

import produto from "../models/Produtos.js"

const Produto = mongoose.model("Produto", produto)

//responsavel pelos metodos fazer o crud
class ProdutoService{
    //Função para cadastrar no banco
    Create(nome, preco, categoria, qtd, unidade, img, pescador) {
        const newProduto = new Produto({
           nome: nome,
           preco: preco,
           categoria: categoria,
           qtd: qtd,
           unidade: unidade,
           img: img,
           pescador: pescador
        })
        newProduto.save() //criação de dados
    }

    //Função para buscar dados no banco
    GetAll(){
        const produtos = Produto.find()
        return produtos
    }

    GetOne(id) {
        const produto = Produto.findOne({_id: id})
        return produto
    }

    Delete(id) {
        Produto.findByIdAndDelete(id).then(() => {
            console.log(`Produto com o id: ${id} foi deletado.`)
        }).catch(err => {
            console.log(err)
        })
    }

    Update(id, nome, preco, categoria) {
        Produto.findByIdAndUpdate(id, {
            nome: nome,
            preco: preco,
            categoria: categoria
        }).then(() => {
            console.log(`Dados do Produto com id: ${id} alterados com sucesso.`)
        }).catch(err => {
            console.log(err)
        })
    }

  async  GetCarrinhoItens(ids) {
        try {

            // Certifique-se de que ids seja um array válido
            if (!Array.isArray(ids) || ids.length === 0) {
               return []
            }

            // Encontrar produtos com base nos IDs fornecidos
            const produtosCarrinho = await Produto.find({ _id: { $in: ids } });

            return produtosCarrinho;
        } catch (error) {
            console.error('Erro ao buscar itens do carrinho:', error);
            throw error;
        }

    }
        
}

export default new ProdutoService()