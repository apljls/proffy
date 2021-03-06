const Database = require('sqlite-async')

//node src/database/db.js
function execute(db){
    //Criando as tabelas do banco de dados
    return db.exec(`
        CREATE TABLE IF NOT EXISTS proffys(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            whatsapp TEXT,
            bio TEXT 
        );

        CREATE TABLE IF NOT EXISTS classes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subject INTEGER,
            coast TEXT,
            proffys_id INTEGER
        );

        CREATE TABLE IF NOT EXISTS classes_schedule (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            class_id INTEGER,
            weekday INTEGER,
            time_from INTEGER,
            time_to INTEGER
        );
    `)
}

module.exports = Database.open(__dirname + '/database.sqlite').then(execute)