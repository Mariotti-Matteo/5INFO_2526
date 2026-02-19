import Database from 'better-sqlite3';
const db = new Database('films.db');

export function load ({params}) {
    const query1 = db.prepare('SELECT * FROM films');
    const res1 = query1.all()

    console.log("database caricato");
    console.log(res1)
    return {
        films: res1,
    }
}

export const actions = {
    aggiungi: async ({cookies, request}) => {
        const data = await request.formData();
        console.log(data)
        
        const query2 = db.prepare('INSERT INTO films (Titolo, Autore, Anno) VALUES (@Titolo, @Autore, @Anno) ')
        const film = {
            titolo: data.get("title"),
            autore: data.get("director"),
            anno: data.get("year")
        }
        if(film.titolo && film.autore && film.anno){
            const res2 = query2.run({
                Titolo: film.titolo,
                Autore: film.autore,
                Anno: film.anno
        });
        } else {
            return { 
                form_error: true,
                forms_val: film
            }
        }

    },

    delete: async ({request}) => {
        const data = await request.formData();
        console.log(data);
        console.log("AZIONE PER ELIMINARE");
        console.log("VALORI DEL FORM: ", data)

        const query4 = db.prepare("DELETE FROM films WHERE Titolo = ?");
        const res4 = query4.run(+data.get("titolo"));
        return {success: true};
        
    }
} 