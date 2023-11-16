import express from 'express' // Importando o Express
const app = express() // Iniciando o Express
import mongoose from 'mongoose' //importando mongoose
import ClientService from './services/ClientService.js' // um ponto final e o diretorio atual, .. ele volta, importando o service de cliente
import bodyParser from 'body-parser' //importando a biblioteca bodyParser
import PedidoService from './services/PedidoService.js' //importando o serviço do pedido
import ProdutoService from './services/ProdutoService.js'
import CarrinhoService from "./services/CarrinhoService.js"; //importando o serviço do produto

//Decodifica os dados recebidos por formulários
app.use(bodyParser.urlencoded({extended: false}))

//permite utilização de dados via json
app.use(bodyParser.json())

//criando conexão com o banco
mongoose.connect("mongodb://127.0.0.1:27017/loja", {useNewUrlParser:true, useUnifiedTopology: true})

//Indicando ao Express a pasta public para arquivos estáticos
app.use(express.static('public'))

// Define o EJS como Renderizador de páginas
app.set('view engine', 'ejs')


// ROTA PRINCIPAL
app.get("/",function(req,res){
    res.render("index")
})


//ROTA PARA CADASTRO DE PRODUTOS - recebendo dados - Rota do tipo post
app.post("/createProduto", (req,res) => {
    ProdutoService.Create(
        req.body.nome,
        req.body.preco,
        req.body.categoria,
        req.body.qtd,
        req.body.unidade,
        req.body.img,
        req.body.pescador
    )
    res.redirect("/produtos")//redirecionando para a pagina clientes.ejs
})

// ROTA PRODUTOS
app.get("/produtos",function(req,res){
    ProdutoService.GetAll().then(produtos => {
       res.render("produtos", {
       produtos : produtos
       })
    })
})

app.get("/produtos/:id",function(req,res){
    const id = req.params.id
    CarrinhoService.Create(id);
    ProdutoService.GetAll().then(produtos => {
        res.render("produtos", {
            produtos : produtos
        })
    })
})

app.get("/carrinho",function(req,res){
    CarrinhoService.GetAll().then(produtos => {
        res.render("carrinho", {
            produtos : produtos
        })
    })
})

app.get("/pagamento",function(req,res){
    ProdutoService.GetAll().then(produtos => {
        res.render("pagamento", {
            produtos : produtos
        })
    })
})

app.get("/compraFinalizada",function(req,res){
    CarrinhoService.delete();
    ProdutoService.GetAll().then(produtos => {
        res.render("compra-finalizada", {
            produtos : produtos
        })
    })
})

// ROTA DE EXCLUSÃO DE PRODUTOS
app.get("/deleteProduto/:id", (req, res) => {
    const id = req.params.id
    ProdutoService.Delete(id)
    res.redirect("/produtos")  
})

// ROTA DE BUSCA DE PRODUTOS
app.get("/findProduto/:id", (req, res) => {
    const id = req.params.id
    ProdutoService.GetOne(id).then(Produto => {
        res.render("dadosproduto", {
            Produto : Produto
        })
    })
})

// ROTA DE ALTERAÇÃO DE PRODUTOS
app.post("/updateProduto/:id", (req, res) => {
    ProdutoService.Update(
        req.body.id,
        req.body.nome,
        req.body.preco,
        req.body.categoria
    )
    res.redirect("/produtos")
})

// INICIA O SERVIDOR NA PORTA 8090
app.listen(8090,function(erro){
    if(erro) {
        console.log("Ocorreu um erro!")

    }else{
        console.log("Servidor iniciado com sucesso!")
    }
})