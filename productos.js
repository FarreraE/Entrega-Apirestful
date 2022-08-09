

// CREAR EL ARCHIVO FILE
const fs = require('fs');

// DECLARACIÓN CLASE CONTENEDOR
class Contenedor {
    // CONSTRUCTOR QUE RECIBE EL NOMBRE DEL ARCHIVO
    constructor(fileName) {
        this.fileName = fileName;
    }
    async crearArchivo(dataFile) {
        try {
            await fs.promises.writeFile(this.fileName, dataFile);
            // console.log("Archivo Creado");
        } catch (error) {
            console.log("Error crear archivo");
        }
    }
    async saveProducto(producto) {
        try {
            let dataFile = await fs.promises.readFile(this.fileName, 'utf-8')
            let inventariodataFile = JSON.parse(dataFile)
            //console.log(JSON.stringify(inventariodataFile) + "------ antes del push");
            producto.id = inventariodataFile.length + 1;
            inventariodataFile.push(producto);
            //console.log(JSON.stringify(inventariodataFile) + "------- despues del push");
            try {
                // console.log(JSON.stringify(inventariodataFile) + "------- escribo");
                await fs.promises.writeFile(this.fileName, JSON.stringify(inventariodataFile));
            }
            catch (error) {
                console.log("Error escritura save");
            }

        }
        catch (error) {
            console.log("Error save");
        }
    }
    async getAll() {
        try {
            let dataFile = await fs.promises.readFile(this.fileName, 'utf8');
            let dataFileParse;
            //   console.log(fileManager.getAll());
            dataFileParse = JSON.parse(dataFile);
            //return JSON.stringify(dataFileParse);
            return dataFileParse;
            //console.log(dataFileParse);

        }
        catch (error) {
            console.log("Error Get All")
        }
    }
    async getById(id) {
        let invenatarioJson = await fs.promises.readFile(this.fileName, 'utf8');
        let inventariodataFile = JSON.parse(invenatarioJson);
        //console.log("Resultado de la busqueda");
        return inventariodataFile.filter(producto => producto.id == id);
    }
    async deleteProducto(id) {
        let invenatarioJson = await fs.promises.readFile(this.fileName, 'utf8');
        let inventariodataFile = JSON.parse(invenatarioJson);
        let newInventario = inventariodataFile.filter(producto => producto.id != id);
        let count = 1;
        newInventario.forEach(producto => {
            producto.id = count++;
        });
        try {
            // console.log(JSON.stringify(inventariodataFile) + "------- escribo");
            await fs.promises.writeFile(this.fileName, JSON.stringify(newInventario));
        }
        catch (error) {
            console.log("Error escritura save");
        }
    }
}

// DECLARACIÇON CLASE PRODUCTO
class Producto {
    constructor(nombre, precio, thumbnail) {
        this.nombre = nombre;
        this.precio = precio;
        this.thumbnail = thumbnail;
    }
}

// CREAMOS OBJETO FILEMANAGER DEL TIPO CONTENEDOR
let fileManager = new Contenedor("producto.txt");

// CREAMOS OBJETO PRODUCCTOS DEL TIPO PRODUCTOS
let producto1 = new Producto("Melon", 1, "www.fotoMelon.com")
let producto2 = new Producto("Pera", 2, "www.fotoPera.com")
let producto3 = new Producto("Uva", 3, "www.fotoUva.com")

producto1.id = 1;
producto2.id = 2;
producto3.id = 3;
let inventario = [producto1, producto2, producto3];

fileManager.crearArchivo(JSON.stringify(inventario))
// ESCRIBE PRODUCTO EN EL ARCHIVO

//fileManager.saveProducto(producto3)
//fileManager.deleteProducto(1);

module.exports = Contenedor;



/*
// Importamos express, instalado con npm
const express = require("express");
//instanciamos express
const app = express();

// guardamos el puerto en una variable
const PORT = 8080;


app.get('/productos', (req, resp) => {
    //response    
    fileManager.getAll()
        .then(data => resp.send(data));

})
app.get('/productosRandom', (req, resp) => {
    //response    
    let num = Math.ceil(Math.random() * 3);
    fileManager.getById(num)
        .then(data => resp.send(data));

})

// listener constamente escucha las modificaciones en el puerto asignado PORT
const server = app.listen(PORT, () => {
    console.log("Escuchando en le puerto: " + server.address().port);
});

// Mensaje de error en caso de error
server.on("error", error => console.log(error));

*/

