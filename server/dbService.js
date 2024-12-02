const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

let instance = null;

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERS,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
})

connection.connect((err) => {
    if (err) {
        console.log(err.message)
    }

    console.log('db ' + connection.state)
})

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async GetAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM users;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return response || [];
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async GetCardData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM cards;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return response || [];
        } catch (error) {
            console.log(error);
        }
    }

    async GetLinks() {
            try {
                const response = await new Promise((resolve, reject) => {
                    const query = "SELECT * FROM links;";
    
                    connection.query(query, (err, results) => {
                        if(err) {
                            reject(new Error(err.message));
                        }
                        resolve(results)
                    })
    
                })
    
                console.log(response)
                return response
    
            } catch (err) {
                console.log(err.message);
            }
        }
    
    async insertEmail(email) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "INSERT INTO users (email) VALUES (?);";

                connection.query(query, email, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return { success: true, data: response };
        } catch (error) {
            console.log(error);
            return { success: false, error: error.message };
        }
    }

    async insertCard(title, description) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "INSERT INTO cards (title, description) VALUES (?, ?);";

                connection.query(query, [title, description], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return { success: true, data: response };
        } catch (error) {
            console.log(error);
            return { success: false, error: error.message };
        }
    }
    
    async insertLink(idlinks, href) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "REPLACE INTO links (idlinks, href) VALUES (?, ?);"

                connection.query(query, [idlinks, href], (err, results) => {
                    if(err) {
                        reject(new Error(err.message));
                    }
                    resolve(results)
                })
            })
            console.log(response)
        } catch (err) {
            console.log(err.message)
        }
    }

    
}

module.exports = DbService;
