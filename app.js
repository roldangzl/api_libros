const express = require('express');
const app = express();
const routeLibros = require("./routes/libros"); //importamos el router de libros
const errorHandler = require("./middlewares/errorHandler"); //importamos el middleware error handler

app.use(express.json());    //siempre que uso json con express hay que declarar esta linea
app.use('/libros', routeLibros);

app.use(errorHandler); 

const port = 3000;

app.listen(port, () => {
    console.log(`Servidor Express.js en funcionamiento en el puerto ${port}`);
});