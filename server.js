const express = require('express')
const { Router } = express
const Products = require('./class/products')

const PORT = 8080

const app = express()
const router = Router()

app.use(express.urlencoded({extended: true}))
app.use('/api/products', router)
app.use(express.static('./public'))

const productos = new Products()

router.get('/', (req, res) => {
    try {
        if(Object.entries(productos.products).length === 0) {
            res.status(200).json("No hay productos cargados")
        } else {
            res.status(200).json(productos.allProducts) 
        } 
    } catch(error){        
        res.status(500).json(error.message)
    }
})

router.get('/:idProduct', (req, res) => {
    try {
        const product = productos.getProductById(req.params.idProduct)
        if(product){
            return res.status(200).json(product)
        } 
        return res.status(200).json({error: "No existe un producto para el id consultado"})
    }catch(error){
        res.status(500).json(error.message)
    }
})

router.post('/', (req, res) => {
    try {
        if(req.body.title && req.body.price){
            const product = productos.saveProduct(req.body)
            res.status(201).json(product)
        }else{
            res.status(400).json({error: "Completar nombre y precio del producto"})
        }
    }catch(error){
        res.status(500).json(error.message)
    }
})

router.put('/:idProduct', (req, res) => {
    try {
        const id = Number(req.params.idProduct)
        const producto = productos.update(id, req.body)
        res.status(200).json(producto)
    }catch(error){
        res.status(`No se pudo editar ${error.message}`)
    }
})

router.delete("/:idProduct", (req, res) => {
    try {
        const id = Number(req.params.idProduct);
        productos.deleteById(id);
        res.status(200).json("Producto eliminado")
    }catch(error){
        res.status(500).json({error: `No se pudo borrar el producto ${error.message}`})
    }
})


const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
 })
 server.on("error", error => console.log(`Error en servidor ${error}`))
 