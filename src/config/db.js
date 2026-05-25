const mysql = require("mysql2");


const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
});


connection.query(
    `CREATE DATABASE IF NOT EXISTS crud_tareas`,
    (err) => {
        if (err) {
            console.log("Error creando la base de datos", err);
        } else {
            console.log("Base de datos lista 🚀");

            
            connection.changeUser(
                { database: "crud_tareas" },
                (err) => {
                    if (err) {
                        console.log("Error usando la base de datos", err);
                    } else {
                        console.log("Conectado a MySQL 🚀");

                        
                        connection.query(`
                            CREATE TABLE IF NOT EXISTS tasks (
                                id INT AUTO_INCREMENT PRIMARY KEY,
                                title VARCHAR(255),
                                description TEXT
                            )
                        `);

                        
                        connection.query(`
                            CREATE TABLE IF NOT EXISTS users (
                                id INT AUTO_INCREMENT PRIMARY KEY,
                                email VARCHAR(255) UNIQUE,
                                password VARCHAR(255)
                            )
                        `);
                    }
                }
            );
        }
    }
);

module.exports = connection;