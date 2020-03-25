/**
 * Rota / recurso 
 */

 /**
  * Metodos HTTP: 
  * 
  * Get: server para buscar/Listar uma informação do back-end
  * Post: server para criar uma nova informação no back-end
  * Put: alterar uma onformação do back-end
  * Delete: deletar informação do back-end
  */

  /**
   * Tipos de parametros:
   * 
   * Query Params: Parametros nomeados enviados na roata apos o "?" (Filtros e paginação)
   * Route Params: Parametros utilizados para identificar recursos
   * Request Body: Corpo da requisição, utilizado para criar ou editar recursos
   */
const express = require('express')
const cors = require('cors')
const app = express()
const routes = require('./routes')
app.use(cors())
app.use(express.json())
app.use(routes)

// aplicação de back-end

app.listen(3333)