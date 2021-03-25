// EXPRESS
const express = require(`express`), Pool = require('pg-pool'), cors = require('cors');
var bodyParser = require('body-parser')
const app = express()
const pool = new Pool({
    user: "postgres",
    password: "entersandman",
    host: `localhost`,
    port: 5432,
    database: `qq_twitter`
})

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ type: 'application/json' }))




//Faz uma chamada post para a rota /login
app.post(`/login`, function (req, res) {
    //a requisição é o input do login e da senha
    const userLogin = req.body.login
    const userPassword = req.body.password
    pool.connect().then(client => {
        //verifica se o login existe na table de usuarios
        client.query(`select * from user_data where login = $1`, [userLogin]).then(result => {
            const [user] = result.rows
            //se o usuario é igual a algum usario da table, verifica se a senha da table é igual ao do input
            if (user.password == userPassword) {
                res.send(JSON.stringify({ authenticated: true, token: userLogin }))
                //numa versão melhor seria bom ter colocado uma hash em ambas as pontas (segurança etc..)
            }
            else {
                res.send(JSON.stringify({ authenticated: false }))
            }

            client.release()
            console.log(userLogin, 'logged in')
        })
            .catch(e => {
                client.release()
                console.error('query error', e.message, e.stack)
            })
    })

})

//Faz uma chamada post para a rota /follows
app.post(`/follows`, function (req, res) {
    //a requisição é o usuario logado
    const userLogin = req.body.login
    pool.connect().then(client => {
        //pesquisa quem o usuario logado segue
        client.query(`select * from follows where fk_user_data_login = $1`, [userLogin]).then(result => {
            const user = result.rows
            //devolve os usuarios que ele segue
            res.send(user)
            client.release()
        })
            .catch(e => {
                client.release()
                console.error('query error', e.message, e.stack)
            })
    })

})
//Faz uma chamada post para a rota /tweet
app.post(`/tweet`, function (req, res) {
    //a requisicao são os usuarios que a pessoa logado segue
    const userLogin = req.body.login
    pool.connect().then(client => {
        //procurar na planilha de tweets os tweets de cada usuario passado na chamada
        client.query(`select * from tweet where fk_user_data_login = $1`, [userLogin]).then(result => {
            const user = result.rows
            console.log(user)
            //devolve os tweets
            res.send(user)
            client.release()
            console.log("Returned tweets")
        })
            .catch(e => {
                client.release()
                console.error('query error', e.message, e.stack)
            })
    })

})


//conecta o servidor na porta 8080 no localhost e confirma por console a porta usada.
var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Listening at http://%s:%s", host, port)
})


