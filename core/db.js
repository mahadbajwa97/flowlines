var sqlDB = require("mssql");
var settings = require("../config");

exports.executeSql = function (sql, callback) {
    var arr = [];
    const { Connection, Request } = require("tedious");
    console.log(settings.dbconfig);
    const connection = new Connection(settings.dbconfig);
    var resultJson;
    // Attempt to connect and execute queries if connection goes through
    connection.on("connect", err => {
        if (err) {
            console.error(err);
            callback(null, err);
        } else {
            console.log("Success");
            console.log(sql);
            const request = new Request(sql, (err, rowCount) => {
                if (err) {
                    console.error("1." + err);
                } else {
                    console.log(`${rowCount} row(s) returned`);
                    resultJson = JSON.stringify(arr);
                    callback(arr);
                }
            });



            request.on("row", columns => {
                let result = new Object();
                columns.forEach(column => {
                    result[column.metadata.colName] = column.value;
                });
                arr.push(result);
            });

            recordedSet = connection.execSql(request);

        }
    });
}
