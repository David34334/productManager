/* Librería nativa para el manejo de archivos (FileSystem) */
const fs = require('fs');

/* Ruta de guardado de archivos */
const ROUTE_TO_SAVE_FILE = './json/products.json';
const ROUTE_TO_SAVE_FILE_IN_TXT = './out/products.txt';

/* Guardar información en un archivo JSON */
const saveInformationInJsonFile = ( data ) => {
    fs.writeFileSync( ROUTE_TO_SAVE_FILE, JSON.stringify(data) );
}

/* Guardar información en un archivo plano de texto (.TXT) */
const saveInformationInTxtFile = ( data = [] ) => {
    let info       = '';
    data.forEach((product, i) => {
        const idx  = i + 1;
        info += `
        ***************************************************
        ${idx}. Nombre producto: ${product.name}
        Descripción producto: ${product.description} 
        Precio producto: $${product.price} 
        Disponibilidad: ${((product.aviable) ? 'Disponible' : 'No Disponible')}
        Última modificación: ${((product.lastModification) ? product.lastModification : product.createAt)}
        Creado en: ${product.createAt}
        ***************************************************
        `;
    });
    fs.writeFileSync( ROUTE_TO_SAVE_FILE_IN_TXT, info );
}

/* Leer información almacenada en archivo JSON */
const readInformationInJsonFile = () => {
    /* Validar si existe el archivo en la ruta */
    if (!fs.existsSync( ROUTE_TO_SAVE_FILE )) return null;
    /* Información recuperada */
    const products = fs.readFileSync( ROUTE_TO_SAVE_FILE, { encoding: 'utf-8' } );
    return JSON.parse( products );
}

module.exports = { saveInformationInJsonFile, readInformationInJsonFile, saveInformationInTxtFile }