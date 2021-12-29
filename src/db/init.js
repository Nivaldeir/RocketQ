 const Database = require("./config")
const initDb = {
    async init(){
        const db = await Database()

        //await esperar o comando ser executado
        await db.exec(`
            CREATE TABLE rooms(
                id INTEGER PRIMARY KEY,
                password TEXT
            )
        `)/
        db.exec(
            `CREATE TABLE questions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                titulo TEXT,
                read INT,
                sala INT
            )`
        )
        await db.close()
    }
    
}
initDb.init();