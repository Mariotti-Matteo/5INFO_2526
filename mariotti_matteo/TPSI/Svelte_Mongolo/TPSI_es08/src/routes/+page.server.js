// // import Database from 'better-sqlite3';

// // const DB = new Database('./db/todoDB.db');
// importiamo il client
// const mongoose = require("mongoose");
import mongoose from "mongoose";



export function load({params}) {
    console.log("ESECUZIONE FUNZIONE LOAD:", Date.now());

    let db = await connect('mongoadmin', 'qwe123', 'todo_list');
    if (db.connection.readyState === 1) {
        console.log("CONNESSIONE AL DB: OK!!");
    }
    else {
        console.log("CONNESSIONE AL DB: FALLITA!!");
    }

    return;

}
// 


(async () => {

});

//crea una connessione al DB
const connect = async (user, passwd, dbname) => {
    let db;
    try {
        db = await mongoose.connect(
            `mongodb://${user}:${passwd}@mongolo:27017/${dbname}?authSource=admin`
        );  
    } catch (e) {
        console.log(e);
        process.exit(0);
    }

    console.log("MongoDB connected");

    return db;
}


export const actions = {
    create: async ({cookies, request}) => {
        const data = await request.formData();

        const todoValue = data.get('todo');
        const priorityValue = data.get('priority');
        const activeValue = 1; //default a true

        const query = DB.prepare("INSERT INTO todo (todo,priority,active) VALUES(@todo, @priority, @active);");
        query.run({
            todo: todoValue,
            priority: Number(priorityValue),
            active: activeValue
        })
    },

    rimuovi: async ({cookies, request}) => {
        console.log("RIMUOVI")
        const data = await request.formData();
        const id = data.get('id');

        const query = DB.prepare('DELETE FROM todo WHERE id=?;');
        query.run(Number(id));
    },

    attiva: async ({cookies, request}) => {
        const data = await request.formData();
        const id = data.get('id');
        const active = data.get('active'); 

        const query = DB.prepare('UPDATE todo SET active=@active WHERE id=@id;');
        query.run({
            id: Number(id),
            active: Number(!Number(active))
        });
    }
}


// 


// const create_todo = async (todo, priority) => {
//     //crea una connessione al DB
//     const todo_list = new mongoose.todo({
//         task: "string",
//         priority: "number",
//         active: "boolean"
//     },
//     {strict:"throw"});

//     await todo.save();
// }
