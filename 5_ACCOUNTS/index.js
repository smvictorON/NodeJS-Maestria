const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs')

operation()

function operation (){
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'O que voce deseja fazer?',
        choices: [
            'Criar Conta',
            'Consultar Saldo',
            'Depositar',
            'Sacar',
            'Sair'
        ]
    }]).then((answer) => {
        const action = answer['action']

        if(action === 'Criar Conta') createAccount()
        else if (action === 'Consultar Saldo') getCountBalance()
        else if (action === 'Depositar') deposit()
        else if (action === 'Sacar') withDraw()
        else {
            console.log(chalk.bgBlue.black('Obrigado por usar o accounts!'))
            process.exit
        }

    }).catch((err) => console.log(err))
}

function createAccount() {
    console.log(chalk.bgGreen.black('Parabéns por escolher o nosso banco!'));
    console.log(chalk.green('Defina a opções da sua conta a seguir'));

    buildAccount()
}

function buildAccount(){
    inquirer.prompt([{
        name: 'accountName',
        message: 'Digite um nome para sua conta:'
    }]).then((answer) => {
        const accountName = answer['accountName']
        console.info(accountName);

        if(!fs.existsSync('accounts'))
            fs.mkdirSync('accounts')

        if(fs.existsSync(`accounts/${accountName}.json`)){
            console.log(chalk.bgRed.black('Essa conta ja existe, escolha outro nome!'));
            buildAccount()
            return
        }

        fs.writeFileSync(`accounts/${accountName}.json`, '{"balance":0}', (err) => console.log(err))

        console.log(chalk.green('Parabéns sua conta foi criada!'));
        operation()
    }).catch((err) => console.log(err))
}

function deposit () {
    inquirer.prompt([{
        name: 'accountName',
        message: 'Qual o nome da sua conta?'
    }]).then((answer) => {
        const accountName = answer['accountName']

        if(!checkAccount(accountName))
            return deposit()

        inquirer.prompt([{
            name: 'amount',
            message: 'Quanto voce deseja depositar?'
        }]).then((answer) => {
            const amount = answer['amount']

            addAmount(accountName, amount)
        }).catch((err) => console.log(err))

    }).catch((err) => console.log(err))
}

function checkAccount(accountName) {
    if(!fs.existsSync(`accounts/${accountName}.json`)){
        console.log(chalk.bgRed.black('Esta conta nao existe, escolha outro nome!'));
        return false
    }
    return true
}

function addAmount(accountName, amount){
    const accountData = getAccount(accountName)

    if(!amount){
        console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!'))
        return deposit()
    }

    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

    fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData), (err) => console.log(err))

    console.log(chalk.green(`Foi depositado um valor de R$${amount} na sua conta!`));

    operation()
}

function getAccount(accountName){
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf-8',
        flag: 'r'
    })

    return JSON.parse(accountJSON)
}

function getCountBalance() {
    inquirer.prompt([{
        name: 'accountName',
        message: 'Qual o nome da sua conta?'
    }]).then((answer) => {
        const accountName = answer['accountName']

        if(!checkAccount(accountName))
            return getCountBalance()

        const accountData = getAccount(accountName)

        console.log(chalk.bgBlue.black(`Olá, o saldo da sua conta é R$${accountData.balance}!`))
        operation()

    }).catch((err) => console.log(err))
}

function withDraw() {
    inquirer.prompt([{
        name: 'accountName',
        message: 'Qual o nome da sua conta?'
    }]).then((answer) => {
        const accountName = answer['accountName']

        if(!checkAccount(accountName))
            return withDraw()

        inquirer.prompt([{
            name: 'amount',
            message: 'Quanto voce deseja sacar?'
        }]).then((answer) => {
            const amount = answer['amount']

            removeAmount(accountName, amount)
        }).catch((err) => console.log(err))

    }).catch((err) => console.log(err))
}

function removeAmount(accountName, amount){
    const accountData = getAccount(accountName)

    if(!amount){
        console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!'))
        return withDraw()
    }

    if(accountData.balance < amount){
        console.log(chalk.bgRed.black('Valor indisponível!'))
        return withDraw()
    }

    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)

    fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData), (err) => console.log(err))

    console.log(chalk.green(`Foi sacado um valor de R$${amount} da sua conta!`));

    operation()
}
