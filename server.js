
// Importamos express, instalado con npm
const express = require("express");
const Router = express;
const Contenedor = require("./productos");
//const Producto = require("./productos");
let fileManager = new Contenedor("./producto.txt");


//instanciamos express
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))
//instanciamos router
const routerProductos = Router();

// guardamos el puerto en una variable
const PORT = 8080;

//.USE => indica que la APP va a utilizar el elemento de express almacenado en Route ()
app.use('/api/productos', routerProductos);
app.use(express.static(__dirname + 'public'))

routerProductos.get('/', (req, res) => {
    fileManager.getAll()
        .then(data => {
            //console.log(data);
            res.send(data);
        })
})

routerProductos.get('/:id', (req, res) => {
    const { id } = req.params
    fileManager.getById(id)
        .then(data => {

            if (data.id == null) {
                data.push('error: Producto no encontrado');
                res.send(data)
            }
            else {
                res.send(data);
            }

        }
        );

})

routerProductos.post('/', (req, res) => {
    const producto = req.body;
    console.log(producto);
    fileManager.saveProducto(producto)
    //console.log("dentro del post");
  
    res.send(producto)

})

routerProductos.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, precio, thumbnail } = req.body;
    fileManager.getAll()
        .then(data => {
            data[id - 1].nombre = nombre;
            data[id - 1].precio = precio;
            data[id - 1].thumbnail = thumbnail;
            fileManager.crearArchivo(JSON.stringify(data));
        });

})

routerProductos.delete('/:id', (req, res) => {
    const { id } = req.params
    fileManager.deleteProducto(id)
        .then(data => res.send(data));

})
//Middlewear 
app.use((req, res,next) => {
     console.log("Hola");
     next();
    // res.sendFile(__dirname + '/public/index.html')
 })
 //send file HTML
app.get('/', (req, res) => {
   // console.log(__dirname)
    res.sendFile(__dirname + '/public/index.html')
})



// listener constamente escucha las modificaciones en el puerto asignado PORT
const server = app.listen(PORT, () => {
    console.log("Escuchando en le puerto: " + server.address().port);
});

// Mensaje de error en caso de error
server.on("error", error => console.log(error));
