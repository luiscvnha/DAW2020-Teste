const express = require('express')
const router = express.Router()
const Batismo = require('../controllers/batismo')


router.get('/', function(req, res) {
    if (req.query.ano) {
        Batismo.listarAno(req.query.ano)
            .then(dados => res.status(200).jsonp(dados))
            .catch(e => res.status(500).jsonp({error: e}))
    } else {
        Batismo.listar()
            .then(dados => res.status(200).jsonp(dados))
            .catch(e => res.status(500).jsonp({error: e}))
    }
})


router.get('/batisado', function(req, res) {
    Batismo.listarBatisados()
        .then(dados => res.status(200).jsonp(dados))
        .catch(e => res.status(500).jsonp({error: e}))
})


router.get('/progenitores', function(req, res) {
    Batismo.listarProgenitores()
        .then(dados => res.status(200).jsonp(dados))
        .catch(e => res.status(500).jsonp({error: e}))
})


router.get('/stats', function(req, res) {
    Batismo.listarStats()
        .then(dados => res.status(200).jsonp(dados))
        .catch(e => res.status(500).jsonp({error: e}))
})


router.get('/:id', function(req, res) {
    Batismo.consultar(req.params.id)
        .then(dados => res.status(200).jsonp(dados))
        .catch(e => res.status(500).jsonp({error: e}))
});
  

module.exports = router;
