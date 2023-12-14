const express = require('express');
//Datos ejemplo simulando base de datos
let libros = [
    { id: 1, titulo: "Libro 1", autor: "Gonzalo" },
    { id: 2, titulo: "Libro 2", autor: "Melina" },
    { id: 3, titulo: "Libro 3", autor: "MelinaGonzalo" }
];

module.exports = libros;