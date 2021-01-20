const express = require('express')
const router = express.Router()
const axios = require('axios')
var token = ""

axios.post('http://clav-api.di.uminho.pt/v2/users/login', {username: "daw2020@teste.uminho.pt", password: "232"})
    .then(dados => token = dados.data.token)
    .catch(e => console.log(e))


router.get('/', function(req, res) {
    res.render('index')
})


router.get('/classes', function(req, res) {
    axios.get('http://clav-api.di.uminho.pt/v2/classes?nivel=1&estrutura=lista&token=' + token)
        .then(dados =>
            res.render('classes', {classes: dados.data})
        )
        .catch(e => res.render('error', {error: e}))
})


router.get('/termos', function(req, res) {
    axios.get('http://clav-api.di.uminho.pt/v2/termosIndice?token=' + token)
        .then(dados =>
            res.render('termos', {termos: dados.data})
        )
        .catch(e => res.render('error', {error: e}))
})


router.get('/classes/:id', function(req, res) {
    axios.get('http://clav-api.di.uminho.pt/v2/classes/c' + req.params.id + '?token=' + token)
        .then(dados => 
            res.render('classe', {classe: dados.data})
        )
        .catch(e => res.render('error', {error: e}))
})


module.exports = router
