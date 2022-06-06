/* Manejo de consola (UI) a través de la libreria Inquirer */
const Inquirer = require('inquirer');
/* Agregar colores a la consola */
require('colors');

/* Menú de opciones */
const menuOptions = [
    {
        type: 'list',
        name: 'option',
        message: 'Bienvenido/a. ¿Qué deseas hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear Producto`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar Productos`
            },
            {
                value: '3',
                name: `${'3.'.green} Editar Producto`
            },
            {
                value: '4',
                name: `${'4.'.green} Eliminar Producto`
            },
            {
                value: '5',
                name: `${'5.'.green} Editar disponibilidad de un producto`
            },
            {
                value: '6',
                name: `${'6.'.green} Guardar información en archivo de texto`
            },
            {
                value: '0',
                name: `0. Salir`.red
            }
        ]
    }
]

/* Pausar la consola a espera de intervención del usuario */
const pauseConsoleMenu = [
    {
        type: 'input',
        name: 'pause',
        message: `Presione ${'ENTER'.green} para continuar`
    }
]

/* Menú principal */
const inquirerMenu = async () => {
    /* Limpieza de consola */
    console.clear();
    /* Parte inicial del menú */
    console.log('**************************************'.cyan);
    console.log('***********PRODUCT MANAGER************'.bgCyan.black);
    console.log('**************************************'.cyan);
    /* Mostrar el menú creado anteriormente y obtener la opción seleccionada por el usuario */
    const { option } = await Inquirer.prompt(menuOptions);
    /* Se retorna la opción seleccionada por el usuario */
    return option;
}

/* Función pausar consola */
const pauseConsoleFunction = async () => {
    console.log('\n');
    const { pause } = await Inquirer.prompt(pauseConsoleMenu);
    return pause;
}

/* Leer entradas del usuario en consola a partir de un mensaje  */
const readAnswersByUserInConsole = async ( message = '' ) => {
    /* Lectura de una entrada por parte del usuario en consola */
    const inputByUserMenu = [
        {
            type: 'input',
            name: 'input',
            message,
            validate(value) {
                if (value.length === 0) return '¡Debe ingresar un valor para cotinuar!'.red;
                return true;
            }
        }
    ];

    const { input } = await Inquirer.prompt(inputByUserMenu);
    return input;
}

/* Listar los productos en consola para editar */
const listProductsToEdit = async ( products = [] ) => {
    const choices = products.map( (product, i) => {
        const idx = `${ i + 1 }`.green;
        return {
            value: product.id,
            name : `${idx}. ${product.name}`
        }
    });

    choices.unshift({
        value: '0',
        name : '0. Cancelar'.red
    });

    const listMenuProducts = [
        {
            type: 'list',
            name: 'id',
            message: 'Editar Producto'.yellow,
            choices
        }
    ]

    const { id } = await Inquirer.prompt( listMenuProducts );
    return id;
}

/* Listar productos en checkbox para editar su disponibilidad */
const listProductsToChangeDisponibility = async ( products = [] ) => {
    const choices = products.map( (product, i) => {
        const idx = `${i + 1}`.cyan;
        return {
            value: product.id,
            name : `${idx}. ${product.name}`
        }
    });

    const listCheckBox = [
        {
            type: 'checkbox',
            name: 'id',
            message: 'Cambiar disponibilidad de un producto'.yellow,
            choices
        }
    ]

    const { id } = await Inquirer.prompt( listCheckBox );
    return id;
}

/* Listar productos para eliminar */
const listsProductsToDelete = async ( products = [] ) => {
    const choices = products.map( ( product, i ) => {
        const idx = `${i + 1}`.red;
        return {
            value: product.id,
            name : `${idx}. ${product.name}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0. Salir'.red
    });

    const listToDelete = [
        {
            type: 'list',
            name: 'ids',
            message: 'Eliminar Producto'.red,
            choices
        }
    ]

    const { ids } = await Inquirer.prompt( listToDelete );
    return ids;
}

/* Confirmar en consola por parte del usuario */
const confirm = async ( message = '' ) => {
    const confirmToUser = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const { ok } = await Inquirer.prompt( confirmToUser );
    return ok;
}


module.exports = { pauseConsoleFunction, inquirerMenu, readAnswersByUserInConsole, confirm, listProductsToEdit, listsProductsToDelete, listProductsToChangeDisponibility }