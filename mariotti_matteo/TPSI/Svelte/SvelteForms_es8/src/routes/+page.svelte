<svelte:head>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
</svelte:head>

<script>
    export let data;

    console.log(data)
    const todos = data.res;
</script>

<div class="container">
    <h1>TOO JS</h1>
    <div class="main">
        <div class="todo-container">
            <form  class="form-create" method="POST" action="?/create">
                <div class="cella">
                    <input type="text" name="todo" placeholder="Inserisci il tuo ToDo" size="25"/>
                </div>
                <div class="cella">
                    <select name="priority">
                        <option value="1">Bassa</option>
                        <option value="2">Media</option>
                        <option value="3">Alta</option>
                    </select>
                </div>
                <div class="cella"></div>
                <div class="cella">
                    <button type="submit">
                        <span class="material-icons green" type="submit">add</span>
                    </button>
                    
                </div>
            </form>            
            <hr>
            {#each todos as todo}  
                <div class="cella {todo.active ? '' : 'hidden'}">{todo.todo}</div>
                <div class="cella">{todo.priority}</div>
                <div class="cella">
                    <form method="POST" action="?/attiva">
                        <input type="hidden" name="id" value="{todo.id}" />
                        <input type="hidden" name="active" value="{todo.active}" />
                        <button type="submit">
                            <span class="material-icons" type="submit">check</span>
                        </button>
                    </form>
                </div>
                <div class="cella">
                    <form method="POST" action="?/rimuovi">
                        <input type="hidden" name="id" value="{todo.id}" />
                        <button type="submit">
                            <span class="material-icons red" type="submit">delete</span>
                        </button>
                    </form>
                </div>  
            {/each}
        </div>
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 0px solid black;
    }    
    .main {
        border: 0px solid red;
    }

    .todo-container {
        width: 50vw;
        border: 0px solid black;
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr;
    }

    .cella {
        /* width: 100px; */
        border: 0px solid black;
        text-align: center;
        padding: 10px;
    }

    .form-create  {
        border:0px solid red;
        grid-column: 1/5;
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr;
        
    }

    hr {
        width: 100%;
        height: 5px;
        background-color: grey;
        grid-column: 1/5;
    }

    .green {
        color: green;
    }

    .red {
        color: red;
    }

    button {
        background-color:  white;
        border: 0;
    }

    .hidden {
        text-decoration: line-through;
    }
</style>