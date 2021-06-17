const Batismo = require('../models/batismo')


// Devolve a lista dos batismos, com os campos: _id, date, title e ref;
module.exports.listar = () => {
    return Batismo
        .find({}, {_id: 1, date: 1, title: 1, ref: 1})
        .exec()
}

// Devolve a informação completa de um batismo;
module.exports.consultar = (id) => {
    return Batismo
        .findOne({_id: id})
        .exec()
}

// Devolve apenas uma lista com os nomes dos indivíduos batizados ordenada alfabeticamente;
module.exports.listarBatisados = () => {
    return Batismo
        .aggregate([
            {$addFields: {'regex_output': {$regexFind: {input: '$title', regex: '(?<=: )[^.]*(?=\.)'}}}},
            {$addFields: {batisado: '$regex_output.match'}},
            {$sort: {batisado: 1}},
            {$project: {_id: 0, batisado: 1}}
        ])
        .exec()
}

// Devolve uma lista de triplos em que cada triplo tem a seguinte estrutura:
// {_id: "identificador do registo original", pai: "nome do pai do indivíduo que foi batizado", mae: "nome da mae do indivíduo que foi batizado"};
// Esta alínea poderá ser resolvida de várias maneira e irá depender da forma como resolveste as primeiras.
module.exports.listarProgenitores = () => {
    return Batismo
        .find({}, {_id: 1, pai: 1, mae: 1})
        .exec()
}

// Devolve a lista de batismos realizados no ano YYYY;
module.exports.listarAno = (ano) => {
    return Batismo
        .find({year: ano})
        .exec()
}

// Devolve uma lista de pares, ano e número de batismos nesse ano.
module.exports.listarStats = () => {
    return Batismo
        .aggregate([
            {$group: {_id: '$year', batismos: {$sum: 1}}},
            {$addFields: {ano: '$_id'}},
            {$project: {_id: 0, ano: 1, batismos: 1}}
        ])
        .exec()
}
