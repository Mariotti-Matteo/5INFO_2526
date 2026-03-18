import { json } from "@sveltejs/kit";

let todos = [
    {
        id: 1,
        task: "Studiare TPSI",
        done: true,
        priority: 1
    },

    {
        id: 2,
        task: "Studiare RETI",
        done: true,
        priority: 1
    }
];

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

    if(params.id){
        const todo = todos.filter( t => t.id == params.id)[0];
        return json(todo);
    } else {
        // const url = new URL(request.url);
        let res = todos;
        if(url.searchParams.has('priority')){
            res = todos.filter (t => t.priority == +url.searchParams.get('priority'));
        } else if(url.searchParams.has('done')) {
            res = todos.filter(t => t.done == (url.searchParams.get('done') === 'true'));
        }
        return json(res);
    } 


}


export async function POST({request}) {
    console.log("RICEVUTO HTTP POST")

    const body = await request.json();
    console.log("BODY:", body)
    body["id"] = Math.ceil(Math.random() * 100);

    todos.push(body);

    return json('OK')
}   


export async function PUT({params, request}) {
    console.log("Ricevuto HTTP PUT con parametro: ", params)

    const body = await request.json();
    console.log("PUT BODY: ", body)

    let todo = todos.findIndex( t => t.id == params.id);

    todos[todo] = body;
    console.log(todo, todos)
    return json("OK");

}


export async function PATCH({params, request}) {
    console.log("Ricevuto HTTP PATCH con parametro:", params);

    let body = await request.json();

    let todo = todos.findIndex(t => t.id == params.id);

    const key = Object.keys(body);
    todos[todo][key] = body[key];

    return json('OK');
}

export async function DELETE({params, request}) {

    console.log("Ricevuto HTTP DELETE con parametro:", params);

    todos = todos.filter(t => t.id != params.id);

    return json("OK")
    
}