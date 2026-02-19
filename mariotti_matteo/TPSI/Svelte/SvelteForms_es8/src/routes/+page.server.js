// import Dabase from 'better-sqlite3';
// const db = new Database('../todo_database.db');

// const query1 = db.prepare('SELECT * FROM todo_table');


// export const actions = {
//     create: async ({ cookies, request }) => {
//         const data = await request.formData();
//         console.log("CREATE ACTION");
//         console.log("I VALORI SONO:", data)

//         const query2 = db.prepare("INSERT INTO todo_table")

//         const task = {
//             todo: data.get("todo"),
//             status: data.get("status"),
//             priority: data.get("priority")
            
//         }
//     }
// }

import Database from 'better-sqlite3';

const DB = new Database('./db/todoDB.db');

export function load({params}) {
    const query = DB.prepare('SELECT * FROM todo;');
    const res = query.all();
    return { res };
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