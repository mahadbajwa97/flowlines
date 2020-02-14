var user = process.env.DBUser || 'mbajwa';
var password = process.env.DBPassword || 'QWErtyuiop46';
var server = process.env.DBServer || 'flowlineserver.database.windows.net';


var config =
{
    user: user,
    password: password,
    server: server,
    database: "flowlines_db",
    options:
    {
        encrypt: true
    }
}

Object.getFlowByID = function (callback) {
    var connection = new strictEqual.Connection(config, function (err) {
        if (err) {
            console.log('Error ' + err);
            callback(err);
        }
        else {
            var request = new strictEqual.Request(connection);
            request.execute('SELECT * FROM Flows', function name(err, recordsets) {
                if (err) {
                    console.log('Error: ' + err);
                    callback(err);
                }
                else {
                    console.dir(recordsets);
                    callback(null, recordsets);
                }
            });
        }
    });
    connection.on('error', function (err) {
        console.log("Error " + err);
    });
}

