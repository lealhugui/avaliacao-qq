// EXPRESS
const express = require(`express`)
const app = express()
// POSTGRES
const { Client } = require(`pg`);
const client = new Client({
    user: "postgres",
    password: "entersandman",
    host: `localhost`,
    port: 5432,
    database: `qq_twitter`
});

// Função para reutilização de codigo da conexão com o db
async function connect() {
    try {
        await client.connect()
        console.log("Connection Sucess")
    }
    catch (e) {
        console.error(`Failed Connection ${e}`)
    }
}
// Função para reutilização de codigo da disconexão do db
async function disconnect() {
    try {
        await client.end()
    }
    catch (e) {
        console.error(`Failed to disconnect ${e}`)
    }
}

async function queryLoginInfo(table, row) {
    try {
        const result = await client.query(`select * from ${table} where login = $1`, [row])
        return result.rows
    }
    catch (e) {
        return []
    }
}

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



connect()
app.get(`/`, async function (req, res) {
    const rows = await queryLoginInfo('user_data', 'fnunez')
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(rows))
})
var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})

