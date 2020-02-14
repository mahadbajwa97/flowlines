var user = process.env.DBUser || 'mbajwa';
var password = process.env.DBPassword || 'QWErtyuiop46';
var server = process.env.DBServer || 'flowline.database.windows.net';
// Create connection to database
exports.dbconfig = {
    authentication: {
        options: {
            userName: 'mbajwa', // update me
            password: 'QWErtyuiop46'
        },
        type: "default"
    },
    server: 'flowline.database.windows.net', // update me
    options: {
        database: "flowlines_db", //update me
        encrypt: true
    }
};
exports.webPort = 9000;
exports.httpMsgsFormat = "HTML";

exports.mailconfig = {
    MAILGUN_USER: 'postmaster@sandbox89256a681ee24ecfbdaf42856c48eb2f.mailgun.org',
    MAILGUN_PASS: '1d650440a09ab51e83c058c79f71cbe8-52b6835e-fd08072'
};