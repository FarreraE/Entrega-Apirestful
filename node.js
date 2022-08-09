
// Importamos express, instalado con npm
const express = require("express");
const Router = express;
const Contenedor = require("./productos");
let fileManager = new Contenedor("./producto.txt");

//instanciamos express
const app = express();
//instanciamos router
const router = Router();

// guardamos el puerto en una variable
const PORT = 8080;

//let fileManager = new Contenedor("producto.txt");

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







