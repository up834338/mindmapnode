'use-strict';
const mysql = require('mysql')

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'nodemysql'
});

connection.connect();
// connection.end();

function SelectQuery () {
    this.query;
    this.replace = {};

    this.select = (fields) => {
        this.query = 'select '
        for (let field of fieldsList) {
            this.query += connection.escapeId(field) + ',';
        }
        this.query.substring(0, this.query.length);
        return this;
    }
    this.from = (tableName) => {
        this.query = this.query ? this.query : 'select *'
        this.query += ' from ' + connection.escapeId(tableName);
        return this;
    }
    this.where = (map) => {
        this.query += ' where ?'
        for (let key in map) {
            this.replace[key] = map[key];
        }
        return this;
    }
    // this.orderBy = (map) => {

    // }
    this.execute = () => {
        connection.query(this.query, this.replace, (error, results, fields) => {
            console.log(error);
            console.log(results);
        });
    }
}

function InsertQuery() {
    this.query;
    this.replace = []

    this.into = (tableName) => {
        this.query = 'insert into ' + connection.escapeId(tableName);
        return this;
    }
    this.fields = (list) => {
        this.query += ' ( ?? )';
        this.replace.push(list); 
        return this;
    }
    this.values = (list) => {
        this.query += ' values ( ? )';
        this.replace.push(list); 
        return this;
    }
    this.execute = () => {
        connection.query(this.query, this.replace, (error, results, fields) => {
            console.log(error);
            console.log(results);
        });
    }
}

function UpdateQuery() {

}

function RemoveQuery() {

}

module.exports.selectQuery = () => {
    return new SelectQuery();
}

module.exports.insertQuery = () => {
    return new InsertQuery();
}
