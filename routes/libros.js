const express = require('express');
const route = express.Router();
const libros = require("../data");
const Joi = require('joi');

//app.use(libros, dataBaseLibros);

const libroSchema = Joi.object({
    titulo: Joi.string().required().label('Titulo'),
    autor: Joi.string().required().label('Autor')
});

//obtener todos los libros
route.get('/', (req, res, next) => {
    try {
        res.json(libros);
    } catch (err) {
        next(err);
    }
});

//obtener un libro por ID
route.get('/:id', (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const libro = libros.find((p) => p.id === id);
    
        if (!libro) {
            const error = new Error("libro no encontrado");
            error.status = 404;
            throw error; //corta la ejecucion, salta al catch directamente y finaliza el programa
        }
      res.json(libro);
    } catch (err) {
      next(err);
    }
});

//crear un nuevo libro
route.post("/", (req, res, next) => {
    try{
        const { error, value} = libroSchema.validate(req.body);
        if (error) {
            const validationError = new Error('Error de validación');
            validationError.status = 400;
            validationError.details = error.details.map(detail => detail.message);
            throw validationError;
        }

        const { titulo, autor } = value;

        const nuevolibro = {
            id: libros.length + 1,
            titulo,
            autor
        };
    
        libros.push(nuevolibro);
        res.status(201).json(nuevolibro);
    } catch (err) {
        next(err);
    }
});

//actualizar libro existente
route.put('/:id', (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const { error, value} = libroSchema.validate(req.body);
        if (error) {
            const validationError = new Error('Error de validación');
            validationError.status = 400;
            validationError.details = error.details.map(detail => detail.message);
            throw validationError;
        }

        const { titulo, autor } = value;
    
        const libro = libros.find((l) => l.id === id);
    
        if (!libro) {
            const error = new Error("libro no encontrado");
            error.status = 404;
            throw error; //corta la ejecucion, salta al catch directamente y finaliza el programa
        }

        libro.titulo = titulo || libro.titulo;
        libro.autor = autor || libro.autor;
    
        res.json(libro);
        } catch (err) {
            next(err);
        }

});

//eliminar un libro
route.delete('/:id', (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const index = libros.findIndex((l) => l.id === id);
    
        if (index === -1) {
            const error = new Error("libro no encontrado");
            error.status = 404;
            throw error; //corta la ejecucion, salta al catch directamente y finaliza el programa
        } 

        const libroEliminado = libros.splice(index, 1);
        res.json(libroEliminado[0]);
        } catch (err) {
            next(err);
        }

});

module.exports = route;