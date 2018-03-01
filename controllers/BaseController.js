var mysql = require('mysql');

function getConnection() {
    return connection = mysql.createConnection({
        host: 'localhost',
        user: 'ms',
        password: 'ms',
        database: 'msdb'
    });
}

module.exports = {

    hotspotMasterController: function (req, res) {
        var connection = getConnection();
        try {
            connection.connect();
            connection.query('SELECT * from hotspots', function (error, results, fields) {
                if (error) throw error;
                return res.json(results);
            });
        } catch (error) {
            throw error;
        } finally {
            connection.end();
        }
    },
    tagMasterController: function (req, res) {
        var connection = getConnection();
        try {
            connection.connect();
            connection.query('SELECT * from tags', function (error, results, fields) {
                if (error) throw error;
                return res.json(results);
            });
        } catch (error) {
            throw error;
        } finally {
            connection.end();
        }
    }
}