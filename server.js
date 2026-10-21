const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Garantir que o servidor aceita e lê JSON corretamente
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
