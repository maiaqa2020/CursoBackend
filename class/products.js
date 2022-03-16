class Products{
    constructor(){
    this.products = [];
    this.id = 0;
    }  

    get allProducts() {
        try{
            return this.products;
        }catch(error){
            throw new Error(`Se produjo un error: ${error.message}`);
        }
    }

    saveProduct(product) {
        try{
            this.id ++
            const newProduct = {
                title: product.title,
                price: product.price,
                thumbnail: product.thumbnail,                
                id: this.id
            };
            this.products.push(newProduct)
            return newProduct;
        }catch(error){
            throw new Error(`error: ${error.message}`)
        }
    }

    getProductById(idProduct) {
        try {
            return this.products.find(product => product.id == idProduct);
        }catch(error) {
            throw new Error(`error: ${error.message}`)
        }
    }

    update(idProduct, body) {
        const product = {
            title: body.title,
            price: body.price,
            thumbnail: body.thumbnail,
            id: idProduct
        };
        const updateIndex = this.products.findIndex((producto) => producto.id == idProduct);
        this.products[updateIndex] = product;
        return product;
    }

    deleteById(idProduct) {
        try {
          const deleteIndex = this.products.findIndex((product) => product.id === idProduct);
          console.log(deleteIndex)
          const deleteData = this.products.splice(deleteIndex,1);
          console.log("Producto eliminado");
          console.log(deleteData);        
        } catch (error) {
          console.log("Error " + error);
        }
    }
}

module.exports = Products;