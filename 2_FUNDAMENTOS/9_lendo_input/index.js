const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

readline.question("Qual sua linguagem preferida? ", (language) => {
    if(language === "JS")
        console.log("Parabéns!");
    console.log(`Minha linguagem preferida é: ${language}`)
    readline.close()
})