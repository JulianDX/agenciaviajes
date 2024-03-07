// Common JS - Antes de existir los módulos
/* const express = require("express"); */
import express from "express";
import router from "./routes/index.js";
import db from "./config/db.js";

const app = express();

// Conectar la base de datos

db.authenticate().then(() => {
  console.log("Base de datos conectada");
}).catch(err => {
    console.log(err);
});

// Definir puerto
const port = process.env.PORT || 4000;

// Habilitar PUG

app.set("view engine", "pug");

// Definir la carpeta publica

app.use(express.static("public"));

// Habilitar body parser

app.use(express.urlencoded({ extended: true }));

// Crear una variable disponible en las vistas
app.use((request, response, next) => {
  const year = new Date();
  const actualYear = year.getFullYear();
  app.locals.actualYear = actualYear;
  app.locals.siteName = "Agencia de Viajes";
  return next();
});

// Agregar router a la app

app.use("/", router);
app.use(router);

app.listen(port, () => {
  console.log("Server running on port " + port);
});
