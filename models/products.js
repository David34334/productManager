const Product = require("./product");
const dayjs   = require("dayjs");

const day = dayjs();

class Products {

    constructor() {
        this._listProducts = {};
    }

    //Creación de un nuevo producto
    createNewProduct( name = '', description = '', price = '', aviable = true, lastModification = null ) {
        const product = new Product( name, description, price, aviable, lastModification );
        this._listProducts[ product.id ] = product;
    }

    //Editar producto
    editProduct( id, name = null , description = null, price = null, aviable = null ) {
        const lastModification = day.format('DD-MM-YYYY h:mm A').toString();
        const product = new Product( name, description, price, aviable, lastModification );
        this._listProducts[ id ] = product;
    }

    //Eliminar producto
    deleteProduct( id ) {
        if ( this._listProducts[ id ] ) delete this._listProducts[ id ];
    }

    //Editar disponibilidad de un producto
    changeStateOfProduct( ids = [] ) {
        ids.forEach( id => {
            const product = this._listProducts[ id ];
            if (!product.aviable) product.aviable = true;
        });

        this._listProductsArr.forEach( product => {
            if (!ids.includes( product.id )) {
                this._listProducts[ product.id ].aviable = false;
            }
        });
    }

    //Listar en un array todos los productos
    listAllProducts() {
        let products = '';
        this._listProductsArr.forEach( (product, i) => {
            const idx = `${ i + 1 }`.green;
            products += `\n${idx}. ${product.name.toString().green} - ${product.description.toString().cyan} - Precio: ${'$'.green}${product.price.toString().green} - Disponibilidad: ${((product.aviable) ? 'Disponible'.green : 'No Disponible'.red)}\n`;
        });
        return products;
    }

    //Almacenar la información de archivo JSON en array.
    uploadInformationProducts( products = [] ) {
        products.forEach( product => this._listProducts[ product.id ] = product );
    }

    /* Getter & Setter */
    //Convertir objetos en un array
    get _listProductsArr() {
        const products = [];
        Object.keys( this._listProducts ).forEach( key => {
            const product = this._listProducts[ key ];
            products.push( product );
        });
        return products;
    }

}

module.exports = Products;