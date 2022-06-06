const { inquirerMenu, pauseConsoleFunction, readAnswersByUserInConsole, confirm, listProductsToEdit, listsProductsToDelete, listProductsToChangeDisponibility } = require("./helpers/inquirer");
const { saveInformationInJsonFile, readInformationInJsonFile, saveInformationInTxtFile } = require("./helpers/saveFile");
const Products = require("./models/products");

const main = async () => {

    let opt = '';
    const product = new Products();

    /* Leer información del archivo JSON */
    const productsByJsonFile = readInformationInJsonFile();

    /* Validar si existe, en caso de ser así, cargarla en el array de productos */
    if (productsByJsonFile) product.uploadInformationProducts(productsByJsonFile);

    do {
        /* leer opción escogida por el usuario */
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const { nameProduct, descProduct, priceProduct, aviableProduct, confirmProductToUser } = await inputsInConsole();
                if (confirmProductToUser) {
                    product.createNewProduct(nameProduct, descProduct, priceProduct, aviableProduct);
                    console.log('Producto creado correctamente!'.bgGreen)
                };
                break;
            case '2':
                console.log(product.listAllProducts());
                break;
            case '3':
                const idProductToEdit = await listProductsToEdit(product._listProductsArr);
                if (idProductToEdit !== '0') {
                    const { nameProduct, descProduct, priceProduct, aviableProduct, confirmProductToUser } = await inputsInConsole();
                    if (confirmProductToUser) {
                        product.editProduct(idProductToEdit, nameProduct, descProduct, priceProduct, aviableProduct);
                        console.log('Producto editado correctamente!'.bgYellow);
                    };
                }
                break;
            case '4':
                const idProductToDelete = await listsProductsToDelete(product._listProductsArr);
                const confirmDecision = await confirm(`${'¿Está seguro/a que desea eliminar el producto'.yellow} ${product._listProducts[idProductToDelete].name.toString().red}${'?'.yellow}`);
                if (confirmDecision) {
                    console.log(`${'El producto '.yellow} ${product._listProducts[idProductToDelete].name.toString().red} ${'ha sido eliminado correctamente!'.yellow}`);
                    product.deleteProduct(idProductToDelete);
                };
                break;
            case '5':
                const ids = await listProductsToChangeDisponibility( product._listProductsArr );
                product.changeStateOfProduct( ids );
                break;
            case '6':
                saveInformationInTxtFile( product._listProductsArr );
                console.log('¡Archivo creado con éxito!'.bgGreen);
                break;
            case '0':
                break;
            default:
                break;
        }

        saveInformationInJsonFile(product._listProductsArr);

        /* Pausar consola */
        await pauseConsoleFunction();
    } while (opt !== '0');

}

/* Console Inputs */
const inputsInConsole = async () => {
    const nameProduct = await readAnswersByUserInConsole('Nombre del producto: '.green);
    const descProduct = await readAnswersByUserInConsole('Descripción del producto: '.green);
    const priceProduct = await readAnswersByUserInConsole('¿Cuál será el precio del producto?: '.green);
    const aviableProduct = await confirm('¿Este artículo estará disponible para venta inmediata?: '.yellow);
    console.log(`Nombre del producto: ${nameProduct} \nDescripción: ${descProduct} \nPrecio: ${priceProduct} \n¿Disponible?: ${aviableProduct}`.cyan);
    const confirmProductToUser = await confirm('¿Los datos ingresados están correctos?'.yellow);

    return { nameProduct, descProduct, priceProduct, aviableProduct, confirmProductToUser }
}

main();