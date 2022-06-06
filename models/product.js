const { v4: uuidv4 } = require('uuid');
const dayjs = require('dayjs');

const day = dayjs();

class Product {

    constructor( name, description, price, aviable, lastModification ) {
        this.id = uuidv4();
        this.name = name;
        this.description = description;
        this.price = price;
        this.aviable = aviable;
        this.lastModification = null;
        this.createAt = day.format('DD-MM-YYYY h:mm A').toString();
    }

}

module.exports = Product;