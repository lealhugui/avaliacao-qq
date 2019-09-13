var express = require(`express`)
var app = express()
const { Client } = require(`pg`);
const client = new Client({
    user: "postgres",
    password: "entersandman",
    host: `localhost`,
    port: 5432,
    database: `qq_twitter`
});


async function connect() {
    try {
        await client.connect()
        console.log("Connection Sucess")
    }
    catch (e) {
        console.error(`Failed Connection ${e}`)
    }
}

async function disconnect() {
    try {
        await client.end()
    }
    catch (e) {
        console.error(`Failed to disconnect ${e}`)
    }
}

async function query(table, row) {
    try {
        return result = await client.query(`select * from ${table} where login = $1`, [row])
    }
    catch (e) {
        console.error(`Failed to query ${e}`)
    }
}

async function QueryLoginData(login) {
    await connect()
    var result = await query(`user_data`, login)
    console.table(result.rows)
    await disconnect()
    return result
}

var result = QueryLoginData('fnunez')
result.then(function (data) {
    var x = data.rows[0].login
    apiLogRequest(x)
})


function apiLogRequest(rest) {
    app.get(`/`, function (req, res) {
        res.send(rest)
    })
    var server = app.listen(8081, function () {
        var host = server.address().address
        var port = server.address().port

        console.log("Example app listening at http://%s:%s", host, port)
    })

}
