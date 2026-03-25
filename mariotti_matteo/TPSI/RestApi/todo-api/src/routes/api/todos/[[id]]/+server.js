import { json } from "@sveltejs/kit";
import { error } from "@sveltejs/kit";
import Database from "better-sqlite3";

// let todos = [
//     {
//         id: 1,
//         task: "Studiare TPSI",
//         done: true,
//         priority: 1
//     },

//     {
//         id: 2,
//         task: "Studiare RETI",
//         done: true,
//         priority: 1
//     }
// ];

const db = new Database('TODO.db', { verbose: console.log });

// export async function GET({request}) {
//     console.log("Ricevuto HTTP GET")

//     return json(todos)
// }


// export async function GET({params, request}) {
//     console.log("RICEVUTO HTTP GET con parametro:", params);

//     if(params.id) {
//         const todo = todos.filter(t => t.id == params.id)[0];
//         return json(todo)
//     }

//     else { 
//         return json(todos)
//     }
// }


export async function GET({params, request, url}) {
    console.log("Ricevuto HTTP GET con parametro:", params)

    const sql_azione2 = db.prepare("SELECT * FROM todo");
    const sql_azione3 = db.prepare("SELECT * FROM todo WHERE id = ?");
    const sql_azione4 = db.prepare("SELECT * FROM todo WHERE done = ?");
    const sql_azione5 = db.prepare("SELECT * FROM todo WHERE priority = ?");

    const exec_query = (azione, params) => {
        console.log("4")
        const todo = params || params == 0 ? azione.all(params) : azione.all()
        console.log("5")
        if(todo.length > 0)
            return json(todo, {status:200})
        else
            return json({}, {status: 404})
    };

    try {
        if(params.id){
            return exec_query(sql_azione3, params.id)
        }
        console.log("1")

        if(url.searchParams.has("priority")) {
            return exec_query(sql_azione5, +url.searchParams.get("priority"));
        }

        console.log("2")

        if(url.searchParams.has("done")) {
            return exec_query(sql_azione4, +JSON.parse(url.searchParams.get("done")));
        }

        console.log("3")
        return exec_query(sql_azione2, params);

    } catch(e) {
        return json({}, { status:500});
    }

}

export async function POST({request}) {
    try {
        const body = await request.json();
        console.log("Ricevuto HTTP POST con body", body)

        const sql_azione = db.prepare("INSERT INTO todo (task, done, priority) VALUES(@task, @done, @priority)");

        const res = sql_azione.run({
            task: body.task,
            done: +body.done,
            priority: +body.priority,
        });

        if (res.changes == 1) {
            body["id"] = res.lastInsertRowid;
            return json(body, {
                status: 201,
                headers: new Headers({"Location": `http://localhost:5173/api/todos/${body["id"]}`})
            })
        }
    } catch (e) {
    console.log(e)
    return json({}, {status:500})   
    }
}

// export async function GET({params, request, url}) {
    
//     console.log("Ricevuto HTTP GET con parametro:", params)

//     if(params.id){
//         const todo = todos.filter( t => t.id == params.id)[0];
//         return json(todo);
//     } else {
//         let res = todos;
//         if(url.searchParams.has('priority')){
//             res = todos.filter (t => t.priority == +url.searchParams.get('priority'));
//         } else if(url.searchParams.has('done')) {
//             res = todos.filter(t => t.done == (url.searchParams.get('done') === 'true'));
//         }
//         return json(res);
//     } 

// }


// export async function POST({request}) {
//     console.log("RICEVUTO HTTP POST")

//     const body = await request.json();
//     console.log("BODY:", body)
//     body["id"] = Math.ceil(Math.random() * 100);

//     todos.push(body);

//     return json('OK')
// }   


// export async function PUT({params, request}) {
//     console.log("Ricevuto HTTP PUT con parametro: ", params)

//     const body = await request.json();
//     console.log("PUT BODY: ", body)

//     let todo = todos.findIndex( t => t.id == params.id);

//     todos[todo] = body;
//     console.log(todo, todos)
//     return json("OK");

// }


// export async function PATCH({params, request}) {
//     console.log("Ricevuto HTTP PATCH con parametro:", params);

//     let body = await request.json();

//     let todo = todos.findIndex(t => t.id == params.id);

//     const key = Object.keys(body);
//     todos[todo][key] = body[key];

//     return json('OK');
// }

// export async function DELETE({params, request}) {

//     console.log("Ricevuto HTTP DELETE con parametro:", params);

//     todos = todos.filter(t => t.id != params.id);

//     return json("OK")
    
// }
