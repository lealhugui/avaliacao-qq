// EXPRESS
const express = require(`express`), Pool = require('pg-pool'), cors = require('cors');
var bodyParser = require('body-parser')

const app = express()
// app.use(express.json())
// app.use(express.urlencoded())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ type: 'application/json' }))

// POSTGRES
// const { Client } = require(`pg`);
// const client = new Client({
//     user: "postgres",
//     password: "entersandman",
//     host: `localhost`,
//     port: 5432,
//     database: `qq_twitter`
// });

const pool = new Pool({
    user: "postgres",
    password: "entersandman",
    host: `localhost`,
    port: 5432,
    database: `qq_twitter`
})



// Função para reutilização de codigo da conexão com o db
// async function connect() {
//     try {
//         await client.connect()
//         console.log("Connection Sucess")
//     }
//     catch (e) {
//         console.error(`Failed Connection ${e}`)
//     }
// }
// Função para reutilização de codigo da disconexão do db
// async function disconnect() {
//     try {
//         await client.end()
//     }
//     catch (e) {
//         console.error(`Failed to disconnect ${e}`)
//     }
// }

// async function queryLoginInfo(table, row) {
//     try {
//         const result = await client.query(`select * from ${table} where login = $1`, [row])
//         return result.rows
//     }
//     catch (e) {
//         return []
//     }
// }

// async function QueryLoginData(login) {
//     await connect()
//     var result = await query(`user_data`, login)
//     // console.log(result.rows)
//     await disconnect()
//     return result
// }

// var result = QueryLoginData('fnunez')
// result.then(function (data) {
//     var x = data.rows[0].login
//     apiLogRequest(x)
// })



// connect()
// app.get(`/`, async function (req, res) {
// const rows = await queryLoginInfo('user_data', 'fnunez')
// res.setHeader('Content-Type', 'application/json');
// res.send(JSON.stringify(rows))
// })

app.post(`/login`, function (req, res) {
    const userLogin = req.body.login
    const userPassword = req.body.password
    pool.connect().then(client => {
        client.query(`select * from user_data where login = $1`, [userLogin]).then(result => {
            const [user] = result.rows
            console.log(user.password)
            // hash
            if (user.password == userPassword) {
                res.send(JSON.stringify({ authenticated: true, token: userLogin }))

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

var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Listening at http://%s:%s", host, port)
})

