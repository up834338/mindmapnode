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
    this.actions = {};

    this.select = (fields) => {
        if (!this.actions.select) {
            this.actions.select = true;
            this.query = 'select '
            for (let field of fieldsList) {
                this.query += connection.escapeId(field) + ',';
            }
            this.query.substring(0, this.query.length);
            return this;
        }
    }
    this.from = (tableName) => {
        if (!this.actions.from) {
            this.actions.from = true;
            this.query = this.query ? this.query : 'select *'
            this.query += ' from ' + connection.escapeId(tableName);
            return this;
        }
    }
    this.where = (map) => {
        if (this.actions.from && !this.actions.where) {
            this.actions.where = true;
            this.query += ' where ?'
            for (let key in map) {
                this.replace[key] = map[key];
            }
            return this;
        }
    }
    // this.orderBy = (map) => {

    // }
    this.first = async () => {
        let data = await this.execute();
        if (data && data.length > 0) {
            return data[0];
        } else {
            return {};
        }
    }
    this.list = async () => {
        let data = await this.execute();
        if (data && data.length > 0) {
            return data;
        } else {
            return [];
        }
    }
    this.execute = () => {
        if (this.actions.from) {
            return new Promise((resolve, reject) => {
                connection.query(this.query, this.replace, (error, results, fields) => {
                    console.log(error);
                    // console.log(results);
                    resolve(results);
                });
            });
        }
    }
}

function InsertQuery() {
    this.query;
    this.replace = [];
    this.actions = {}

    this.into = (tableName) => {
        if (!this.actions.into) {
            this.actions.into = true;
            this.query = 'insert into ' + connection.escapeId(tableName);
            return this;
        }
    }
    this.fields = (list) => {
        if (this.actions.into && !this.actions.fields && !this.actions.values) {
            this.actions.fields = true;
            this.query += ' ( ?? )';
            this.replace.push(list); 
            return this;
        }
    }
    this.values = (list) => {
        if (this.actions.into && !this.actions.values) {
            this.actions.values = true;
            this.query += ' values ( ? )';
            this.replace.push(list); 
            return this;
        }
    }
    this.execute = async () => {
        if (this.actions.into && this.actions.values) {
            return new Promise((resolve, reject) => {
                connection.query(this.query, this.replace, (error, results, fields) => {
                    console.log(error);
                    // console.log(results);
                    resolve(results.insertId);
                });
            })
        }
    }
}

function UpdateQuery() {
    this.query;
    this.replace;
}

function DeleteQuery() {
    this.query = 'delete from ';
    this.replace = {};

    this.from = (tableName) => {
        this.query += connection.escapeId(tableName);
        return this;
    }
    this.where = SelectQuery.where;
    this.execute = () => {
        if (this.actions.from && this.actions.where) {
            connection.query(this.query, this.replace, (error, results, fields) => {
                console.log(error);
                console.log(results);
            });
        }
    }
}

module.exports.selectQuery = () => {
    return new SelectQuery();
}

module.exports.insertQuery = () => {
    return new InsertQuery();
}

module.exports.updateQuery = () => {
    return new UpdateQuery();
}

module.exports.deleteQuery = () => {
    return new DeleteQuery();
}

function putAll(to, from) {
    for (key in from) {
        to[key] = from[key];
    }
    return to;
}