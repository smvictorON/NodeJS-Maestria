const fs = require('fs')

const novo = 'novoarquivo.txt'
const antigo = 'arquivo.txt'

fs.rename('arquivo.txt', 'novoarquivo.txt', function(err) {
    if(err) {
        console.log(err);
        return
    }
    console.log(`Arquivo ${antigo} foi renomeado para ${novo}!`)
})