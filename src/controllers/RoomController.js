const Database = require("../db/config")

module.exports = {
    async create(req, res){
        const db = await Database()
        const pass = req.body.password;
        let roomId
        let isRoom = true;
        while(isRoom){
            // Gera o numero da sala
            for(var i=0;i<6;i++){
                i == 0 ? roomId = Math.floor(Math.random()* 10).toString() :
                roomId += Math.floor(Math.random() * 10).toString()
            }
            console.log(roomId)
            //Verifica de esse numero já existe
            const roomExistsIds = await db.all(`SELECT id FROM rooms`) 

            isRoom = roomExistsIds.some(roomExistId => roomExistId === roomId)
            if(!isRoom){
                await db.run(`INSERT INTO rooms(
                    id,
                    password  
                ) VALUES(
                    ${parseInt(roomId)}, 
                    "${pass}"
                )`)
            }
        }
        await db.close()

        res.redirect(`/room/${roomId}`)
    },
    async open(req, res){
        const db = await Database()
        const roomId = req.params.room
        const questions = await db.all(
            `SELECT * FROM questions WHERE sala = ${roomId} AND read = 0`
        )
        const questionsRead = await db.all(
            `SELECT * FROM questions WHERE sala = ${roomId} AND read = 1`
        )

        let isQuestions = true
        if(questions.length == 0){
            if(questionsRead.length == 0){
                isQuestions = false
            }
        }
        res.render("room", {roomId: roomId, questions:questions, questionsRead:questionsRead, isQuestions: isQuestions})
        
    },
    enter(req, res){
        const roomId =    req.body.roomId
        res.redirect(`/room/${roomId}`)

    }
}