const express = require('express');
const routes = express.Router()
const homeControler = require('./controllers/homeController')

routes.get('/', homeControler.index);
routes.get('/search', homeControler.search)
module.exports = routes;
