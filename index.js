var firebase = require('firebase-admin');
const app = require('express')();
const routes = require('./routes');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'ms',
    password: 'ms',
    database: 'msdb'
});

connection.connect();

firebase.initializeApp({
    credential: firebase.credential.cert({
        project_id: 'subbu-work1',
        private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDD27KmnQ++eC0t\nUyR6KRAunUT8M9npPQCfcTkwaE8uCK5ag5uMy/QInVdfsfsWKMzVlXqZD6cTCsdC\nj2XtHSPQeSd7ArLFhstUEx0kziHRhoEyeqA/mtRzz+cn816GU5CEcw58+3AOlwH/\nSzRHZfvfgGAmtMPIiI7SmgNmtqZmz76zCXC+P2bFbN1C1JDiSWX6KM7HhWbcqpTl\n2uUOB/eUGfp7QKMAmJixUsrn8Jr8qQJGB48gZaUexaK9I9ICZxI+LBOEfSepE6/S\nv2pwurA3jZsKPfQtbzs0ZTbDOMLEkOmzlCZZ9mjdu5hDSvjmQ/Ak/+r/+rR7fM7c\nrxkyTri7AgMBAAECggEATixsfBAIbq+s6IBc+N1W9iQTms5fVbbhfsJEX0vi/q68\nWKha97GYL7ANZca2Pzv9teo5ysnyl6kfqzNtLV0KJHWXCoQjMrAAjAgtA7m6ydRz\n0OAdAgYccjUzQEDlI5xK/HKn/76kFU60n182+KB+DdFBj3FrC6llyC1s2hxhAnuK\nCvMk3l/ggS87O5mcUWEEPuamlfvQGfa+yJuwNRswyLkom58bJ08+zwp4AszdNSbe\ndVZlokcUfMtsP+R+/fmizFAA7896ZLGeyi+HkBVsWGm/8eec16vNabv+UgDkpht+\nn6l/sVYDF9l6YC9CGO8RCzggq9iUCsO8FqlJqLFdMQKBgQDkcrLi9ha/vN6tV4Am\nH+h1ApWJMWSky207uszPpnQ2lCMfiblTrxzA++bFsBa9heMjLrXb/Sj6oKNqppoF\nA71si8yevJPHZQEg3cyQFKVXCC7AjjsX1IfZKzXTG2uzYhZ9LfnRcso0CwSFglTf\nyBnlRMBdeRKa2mkb+dBRRYnYvQKBgQDbesrIQJEbXfnlMxjWJg2A8xWOoMWfqNi7\n4gqwfwMqo1z+314Fo904C8RiQew5jnS5XwcOmOyziW2qCAHu8y/BoOLSArm7g+au\nFJN5dK1t4Cz/IQ7fGDUjJrUiLr9aNC+Rdw8DyGf/rsrcFrI8COpt5RJH3Zq6SzX2\noDCdMkia1wKBgQDNlpd8f2EbrrprHzrZlI+bdfbjH4tmbxhfz41wNmmRkKFHSad6\nMzZaSph1QjJE30/5IplRYDRX0OcgHMyxRJtdKza7iBQqNrDcRh9JbvsZJukEKzvt\nBzw2aZen4556MgTxJMYVAwwL5/pquE7vkWIUnVnNBR+EMpizL4+VBFK4tQKBgGDv\nZbp2EeCla+ZX4ANNAS/PrNi2lzIB799jYVc8cZiWWE9VNgCFtAG56L2A4iU1jsYE\ne2huEDTnYKD1Mm1nyNLbDPK2M3PnOK3v9oZxCtv5Y8Y2wouz9FwXD28OeIMNg2ja\nza3dCFm7yGrWN1gek/N/dch5zomzCB1p+K6k8743AoGBAKY2CvhoPdjfr2hL1zkg\nQEO/rSYAjn2Oif1nl+yUi8Ar9qzg0YNpdgJGXCqEHxMpjFlxRtn/rKwppCD4bIt9\nT1uF5VwKbO+GZKss4vkuLVZrAGRzo/qAlCiZKnmO6GifqsSswytZwrAks/+nSaDt\ndO/fYVLVRT45zimi/51onVE+\n-----END PRIVATE KEY-----\n',
        client_email: 'firebase-adminsdk-5nsz3@subbu-work1.iam.gserviceaccount.com',
    }),
    databaseURL: 'https://subbu-work1.firebaseio.com'
});

var hotspotRef = firebase.database().ref('hotspotList/');
hotspotRef.on('child_added', function (snapshot, prevChildKey) {
    var hotspot = snapshot.val();
    var postData = {
        hotspot_key: "",
        hotspot_ssid: hotspot.ssid,
        hotspot_name: hotspot.name,
        hotspot_latitude: hotspot.latitude,
        hotspot_longitude: hotspot.longitude
    };
    connection.query('INSERT INTO hotspots SET ?', postData, function (error, results, fields) {
        if (error) throw error;

    });
});

var tagRef = firebase.database().ref('tagList/');
tagRef.on('child_added', function (snapshot, prevChildKey) {
    var tag = snapshot.val();
    var postData = {
        tag_name: tag.name,
    };
    connection.query('INSERT INTO tags SET ?', postData, function (error, results, fields) {
        if (error) throw error;

    });
});

/**Assign the app to use the routes for routing from routes.js */
app.use('/', routes);

/**Assign a port number to listen to */
const portNumber = 1337;
app.listen(portNumber, function () {
    console.log('Listening to port ' + portNumber + '...')
});