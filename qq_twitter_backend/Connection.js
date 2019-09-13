var express = require('express')
var app = express()
function test(rest) {
    app.get('/', function (req, res) {
        res.send(rest)
    })
    var server = app.listen(8081, function () {
        var host = server.address().address
        var port = server.address().port

        console.log("Example app listening at http://%s:%s", host, port)
    })

}

const { Client } = require('pg');

const client = new Client({
    user: "postgres",
    password: "entersandman",
    host: 'localhost',
    port: 5432,
    database: 'qq_twitter'
});


async function QueryLoginData(login) {
    var result = null
    try {
        await client.connect()
        console.log("Connected")
        result = await client.query("select * from user_data where login = $1", [login])
        console.table(result.rows)
        // console.log(result.rows[0].login)
    }
    catch{
        e => console.log(e)
    }
    finally {
        await client.end()
        console.log("Connection ended")
    }
    // console.log(result.rows[0].login)
    return result
    // return result;
}

var result = QueryLoginData('fnunez')
result.then(function (data) {
    var x = data.rows[0].login
    test(x)
})

// client.connect()
//     .then((console.log("Connected")))
//     .then(() => client.result("select * from user_data"))
//     .then(result => console.table(result.rows))
//     .catch(e => console.log(e))
//     .finally(() => client.end())