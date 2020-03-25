const express = require('express')
const routes = express.Router()
const ongController = require('./controllers/ongController')
const incidensController = require('./controllers/incidensController')
const profileController = require('./controllers/profileControler')
const sessionControler = require('./controllers/sessionController')

routes.post('/sessions', sessionControler.create)

routes.get('/ongs', ongController.index)
routes.post('/ongs', ongController.create);

routes.get('/incidens', incidensController.index)
routes.post('/incidens', incidensController.create)
routes.delete('/incidens/:id', incidensController.delete)

routes.get('/profile', profileController.index)



module.exports = routes