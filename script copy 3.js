let allPokemons = 20;
let currentPokemon;

/* async function loadAllPokemons() {

    let url = 'https://pokeapi.co/api/v2/pokemon/1/';
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log(currentPokemon);

    renderAllPokemons();
} */

function renderSinglePokemon() {
    document.getElementById('dialog').classList.remove('d-none');
    renderPokemonInfo();
    renderAbout();
}

function closeSinglePokemon() {
    document.getElementById('labels').innerHTML = '';
    document.getElementById('dialog').classList.add('d-none');
}

async function renderAllPokemons() {
    let poks = document.getElementById('allPoks');


    for (let i = 1; i <= allPokemons; i++) {
/*         let pok = i;  */

        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
        let response = await fetch(url);
        currentPokemon = await response.json();

        poks.innerHTML += `
        <div id="singlePok" class="singleBox" onclick="renderSinglePokemon()">
            <div class="cardHeader">
                <div class="figurePositionAll">
                    <img class="figSizeAll" src="${currentPokemon['sprites']['other']['official-artwork']['front_default']}">
                </div>
            </div>
            <div class="infoContainerAll">
                <div class="pokHeader">
                    <div id="pokIDAll" class="pokNr">#${currentPokemon['id']}</div>
                    <div class="pokName">${currentPokemon['name']}</div>
                    <div id="labelsAll${i}" class="label"></div>
                </div>
            </div>
        </div>
        `;

       /* document.getElementById('pokIDAll').innerHTML = '#' + currentPokemon['id'];
        document.getElementById('pokemonNameAll').innerHTML = currentPokemon['name'];
        document.getElementById('figureAll').src = currentPokemon['sprites']['other']['official-artwork']['front_default']; */

        let label = document.getElementById('labelsAll${i}');
        let types = currentPokemon['types'];
        for (let i = 0; i <= types.length; i++) {
            let type = types[i];

            if (type[i]['name'] == 'grass') {
                label.innerHTML += `<span class="badge text-bg-bug">${type[i]['name']}</span>`;
            } if (type[i]['name'] == 'poison') {
                label.innerHTML += `<span class="badge text-bg-danger">${type[i]['name']}</span>`;
            } else {
                label.innerHTML += `<span class="badge text-bg-dark">${type[i]['name']}</span>`;
            }
        } 
    } 
}

function renderPokemonInfo() {
    /*  console.log(currentPokemon['name']); */
    document.getElementById('pokID').innerHTML = '#' + currentPokemon['id'];
    document.getElementById('pokemonName').innerHTML = currentPokemon['name'];
    /* document.getElementById('figure').src = currentPokemon['sprites']['front_female'];  -  schlechte Qualität */
    document.getElementById('figure').src = currentPokemon['sprites']['other']['official-artwork']['front_default'];

    let label = document.getElementById('labels');
    let types = currentPokemon['types']; // Ist ein Array
    for (let i = 0; i < types.length; i++) {
        const type = types[i];
        /*  console.log(currentPokemon['types']); */

        if (type['type']['name'] == 'bug') {
            label.innerHTML += /*html*/  `<span class="badge text-bg-bug">${type['type']['name']}</span>`;
        } if (type['type']['name'] == 'flying') {
            label.innerHTML += /*html*/  `<span class="badge text-bg-danger">${type['type']['name']}</span>`;
        } else {
            label.innerHTML += /*html*/  `<span class="badge text-bg-dark">${type['type']['name']}</span>`;
        }
        //  label.innerHTML += /*html*/  `<span class="badge text-bg-bug">${type['type']['name']}</span>`;   mit += füge ich etwas hinzu
    }
}

function renderMoves() {
    document.getElementById('moves').classList.remove('d-none');
    document.getElementById('aboutTab').classList.remove('selectedItem');
    document.getElementById('baseTab').classList.remove('selectedItem');
    document.getElementById('about').classList.add('d-none');
    document.getElementById('baseStates').classList.add('d-none');
    document.getElementById('moveTab').classList.add('selectedItem');

    let moveLabels = document.getElementById('labelsMoves');
    let movePok = currentPokemon['moves']; // Ist ein Array
    /*  console.log(movePok); */

    for (let i = 0; i < movePok.length; i++) {
        let move = movePok[i];

        moveLabels.innerHTML += /*html*/  `<span class="badge text-bg-bug">${move['move']['name']}</span>`;
    }
}

function renderAbout() {
    document.getElementById('about').classList.remove('d-none');
    document.getElementById('moveTab').classList.remove('selectedItem');
    document.getElementById('baseTab').classList.remove('selectedItem');
    document.getElementById('moves').classList.add('d-none');
    document.getElementById('baseStates').classList.add('d-none');
    document.getElementById('aboutTab').classList.add('selectedItem');

    let heightPok = currentPokemon['height'];
    let weightPok = currentPokemon['weight'];
    let expPok = currentPokemon['base_experience'];

    let aboutContainer = document.getElementById('about');
    aboutContainer.innerHTML = /*html*/  `
    <table class="table">
        <tbody>
            <tr>
                <th scope="row">Height:</th>
                <td>${heightPok} Centimeter</td>
            </tr>
            <tr>
                <th scope="row">Weight:</th>
                <td>${weightPok} Gramm</td>
            </tr>
            <tr>
                <th scope="row">Abilities:</th>
                <td id="abilitiesPok"></td>
            </tr>
            <tr>
                <th scope="row">Base Experience:</th>
                <td>${expPok}</td>

            </tr>
        </tbody>
    </table>
    `;

    let abPokRow = document.getElementById('abilitiesPok');
    let abil = currentPokemon['abilities']; // Ist ein Array
    for (let i = 0; i < abil.length; i++) {
        let ab = abil[i];
        /*  console.log(ab); */
        abPokRow.innerHTML += /*html*/  `<span>${ab['ability']['name']}</span><br>`;
    }
}

function renderBaseStats() {
    document.getElementById('baseStates').classList.remove('d-none');
    document.getElementById('aboutTab').classList.remove('selectedItem');
    document.getElementById('moveTab').classList.remove('selectedItem');
    document.getElementById('about').classList.add('d-none');
    document.getElementById('moves').classList.add('d-none');
    document.getElementById('baseTab').classList.add('selectedItem');

    let basesContainer = document.getElementById('baseStates');
    basesContainer.innerHTML = /*html*/  `
    <table class="table tableBaseStates">
        <tbody>
            <tr>
                <th scope="row" class="baseText">HP:</th>
                <td>
                    <div class="progress" role="progressbar"
                    aria-label="Default striped example" aria-valuenow="10"
                    aria-valuemin="0" aria-valuemax="100">
                        <div class="progress-bar progress-bar-striped" style="width: 30%"></div>
                    </div>
                </td>
            </tr>
            <tr>
                <th scope="row" class="baseText">Attack:</th>
                <td>
                    <div class="progress" role="progressbar"
                    aria-label="Success striped example" aria-valuenow="25"
                    aria-valuemin="0" aria-valuemax="100">
                        <div class="progress-bar progress-bar-striped bg-success"
                        style="width: 25%"></div>
                    </div>
                </td>
            </tr>
            <tr>
                <th scope="row" class="baseText">Defense:</th>
                <td colspan="2">
                    <div class="progress" role="progressbar" aria-label="Info striped example"
                    aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                        <div class="progress-bar progress-bar-striped bg-info"
                        style="width: 50%"></div>
                    </div>
                </td>
            </tr>
            <tr>
                <th scope="row" class="baseText">Specialattack:</th>
                <td colspan="2">
                    <div class="progress" role="progressbar"
                    aria-label="Warning striped example" aria-valuenow="75"
                    aria-valuemin="0" aria-valuemax="100">
                        <div class="progress-bar progress-bar-striped bg-warning"
                        style="width: 75%"></div>
                    </div>
                </td>
            </tr>
            <tr>
                <th scope="row" class="baseText">Specialdefense:</th>
                <td colspan="2">
                    <div class="progress" role="progressbar" aria-label="Danger striped example"
                    aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                        <div class="progress-bar progress-bar-striped bg-danger"
                        style="width: 100%"></div>
                    </div>
                </td>
            </tr>
            <tr>
                <th scope="row" class="baseText">Speed:</th>
                <td colspan="2">
                    <div class="progress" role="progressbar" aria-label="Danger striped example"
                    aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                        <div class="progress-bar progress-bar-striped bg-danger"
                        style="width: 100%"></div>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    `;
}