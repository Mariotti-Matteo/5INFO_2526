<script>
    export let data;
    let error = false;

</script>

<div class="container">
    <h1>Videoteca</h1>
    
    <form id="movieForm" action="/?/aggiungi" method="POST">
        <input type="text" name="title" placeholder="Titolo" required>
        <input type="text" name="director" placeholder="Regista" required>
        <input type="number" name="year" placeholder="Anno di uscita" required>
        <button type="submit" id="submitButton">Aggiungi Film</button>
    </form>
    <!-- <form action="/?aggiungi" id="add" method="POST"></form> -->

    <table id="movieTable">
        <thead>
            <tr>
                <th>Titolo</th>
                <th>Regista</th>
                <th width="5%">Anno</th>
                <th width="25%">Azioni</th>
            </tr>
        </thead>
        <tbody>
            <!-- <tr>
                <td>Film 1</td>
                <td>Regista 1</td>
                <td>3000</td>
                <td>
                    <button class="edit">Modifica</button>
                    <button type="submit">Rimuovi</button>
                </td>
            </tr>
            <tr>
                <td>Film 2</td>
                <td>Regista 2</td>
                <td>3000</td>   
                <td>
                    <button class="edit">Modifica</button>
                    <button type="submit">Rimuovi</button>
                </td>
            </tr> -->
            {#each data.films as film}
                <tr>
                    <td>{film.Titolo}</td>
                    <td>{film.Autore}</td>
                    <td>{film.Anno}</td>
                    <td>
                        <button class="edit">Modifica</button>
                        <!-- <button type="submit">Rimuovi</button> -->
                        <form method="POST" action="/?/delete">
                            <input type="hidden" name="id" value={film.Titolo}>
                            <button type="submit" class="remove">Rimuovi</button>
                        </form>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<style>

:global(body) {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
}

.container {
    max-width: 800px;
    margin: 20px auto;
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
    text-align: center;
    color: #333;
}

form {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

form input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

form button {
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
}

form button:hover {
    color: white;
    background-color: #4cae4c;
}

table {
    width: 100%;
    border-collapse: collapse;
}

table th,
table td {
    padding: 10px;
    text-align: left;
    border: 1px solid #ddd;
}

table th {
    background-color: #f8f8f8;
}

table td button {
    background-color: #d9534f;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    margin-right: 10px;
    cursor: pointer;
}

table td button:hover {
    background-color: #c9302c;
}

table td button.edit {
    background-color: #0275d8;
}

table td button.edit:hover {
    background-color: #025aa5;
}

.error {
    border: 2px solid red;
}
</style>