let firstPokemons = 25;
let currentPokemon;
let singlePokemon;
let allPokemons = [];

// basketMenus.push(menu);
//https://pokeapi.co/api/v2/pokemon?limit=50&offset=0

async function loadPokemons() {

    for (let i = 1; i <= firstPokemons; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        allPokemons.push(currentPokemon);
    }
    renderAllPokemons();
} 

function renderSinglePokemon(i) {
    singlePokemon = allPokemons[i];
    document.getElementById('dialog').classList.remove('d-none');
    renderPokemonInfo(singlePokemon, i);
    renderAbout(singlePokemon, i);
}

function closeSinglePokemon() {
    document.getElementById('labels').innerHTML = '';
    document.getElementById('dialog').classList.add('d-none');
}

function renderAllPokemons() {
    let poks = document.getElementById('allPoks');

    for (let i = 0; i < allPokemons.length; i++) {
        singlePokemon = allPokemons[i];

        poks.innerHTML += /*html*/ `
                <div id="singlePok" class="singleBox" onclick="renderSinglePokemon(${i})">
                    <div class="cardHeader">
                        <div class="figurePositionAll">
                            <img class="figSizeAll" src="${singlePokemon['sprites']['other']['official-artwork']['front_default']}">
                        </div>
                    </div>
                    <div class="infoContainerAll">
                        <div class="pokHeader">
                            <div id="pokIDAll" class="pokNr">#${singlePokemon['id']}</div>
                            <div class="pokName">${singlePokemon['name']}</div>
                            <div id="labelsAll${i}" class="label"></div>
                        </div>
                    </div>
                </div>
                `;

       // currentPokemon['types'][0]['type']['name']
        let label = document.getElementById(`labelsAll${i}`);
        let types = singlePokemon['types']; 

        for (let j = 0; j < types.length; j++) {
        /*     let type = types[j]; */

            if (types[j]['type']['name'] == 'normal') {
               label.innerHTML +=   `<span class="badge text-bg-dark">${types[j]['type']['name']}</span>`;
            } 
            if (types[j]['type']['name'] == 'water') {
                label.innerHTML +=   `<span class="badge text-bg-dark">${types[j]['type']['name']}</span>`;
            } 
            if (types[j]['type']['name'] == 'flying') {
                label.innerHTML +=   `<span class="badge text-bg-danger">${types[j]['type']['name']}</span>`;
            } 
            if (types[j]['type']['name'] == 'bug') {
               label.innerHTML +=   `<span class="badge text-bg-danger">${types[j]['type']['name']}</span>`;
            } 
            if (types[j]['type']['name'] == 'poison') {
                label.innerHTML +=   `<span class="badge text-bg-danger">${types[j]['type']['name']}</span>`;
            } 
            if (types[j]['type']['name'] == 'electric') {
                label.innerHTML +=   `<span class="badge text-bg-danger">${types[j]['type']['name']}</span>`;
            } 
            if (types[j]['type']['name'] == 'grass') {
               label.innerHTML +=   `<span class="badge text-bg-bug">${types[j]['type']['name']}</span>`;
            } 
            if (types[j]['type']['name'] == 'fire') {
                label.innerHTML +=   `<span class="badge text-bg-danger">${types[j]['type']['name']}</span>`;
            } 
            if (types[j]['type']['name'] == 'ground') {
                label.innerHTML +=   `<span class="badge text-bg-dark">${types[j]['type']['name']}</span>`;
            } 
            if (types[j]['type']['name'] == 'rock') {
                label.innerHTML +=   `<span class="badge text-bg-dark">${types[j]['type']['name']}</span>`;
            } 
            if (types[j]['type']['name'] == 'steel') {
                label.innerHTML +=   `<span class="badge text-bg-danger">${types[j]['type']['name']}</span>`;
            } 
            if (types[j]['type']['name'] == 'fairy') {
                label.innerHTML +=   `<span class="badge text-bg-dark">${types[j]['type']['name']}</span>`;
            } 
        }
    } 
}

function renderPokemonInfo(singlePokemon, i) {
    singlePokemon = allPokemons[i];

    document.getElementById('pokID').innerHTML = '#' + singlePokemon['id'];
    document.getElementById('pokemonName').innerHTML = singlePokemon['name'];
    document.getElementById('figure').src = singlePokemon['sprites']['other']['official-artwork']['front_default'];

/*     let pokInfoNavi = document.getElementById('pokInfo');      */     

    let label = document.getElementById(`labels${i}`);
    let types = singlePokemon['types']; 
    for (let j = 0; j < types.length; j++) {

        if (types[j]['type']['name'] == 'bug') {
            label.innerHTML += /*html*/  `<span class="badge text-bg-bug">${type['type']['name']}</span>`;
        } 
        if (types[j]['type']['name'] == 'flying') {
            label.innerHTML += /*html*/  `<span class="badge text-bg-danger">${type['type']['name']}</span>`;
        } 
        /*if (types[j]['type']['name'] == 'normal') {
            label.innerHTML +=   `<span class="badge text-bg-dark">${type['type']['name']}</span>`;
         }
        else {
            label.innerHTML +=  `<span class="badge text-bg-dark">${type['type']['name']}</span>`;
        }*/
    }

   /*  pokInfoNavi.innerHTML =  `<div class="hstack gap-5">
                            <div id="aboutTab" class="tabText" onclick="renderAbout(${i})">About</div>
                            <div id="baseTab" class="tabText" onclick="renderBaseStats(${i})">Base Stats</div>
                            <div id="moveTab" class="tabText" onclick="renderMoves(${i})">Moves</div>
                        </div>
                        `;    */     
}

function renderAbout(singlePokemon, i) {
    singlePokemon = allPokemons[i];

    document.getElementById('about').classList.remove('d-none');
    document.getElementById('moveTab').classList.remove('selectedItem');
    document.getElementById('baseTab').classList.remove('selectedItem');
    document.getElementById('moves').classList.add('d-none');
    document.getElementById('baseStates').classList.add('d-none');
    document.getElementById('aboutTab').classList.add('selectedItem');

    let heightPok = singlePokemon['height'];
    let weightPok = singlePokemon['weight'];
    let expPok = singlePokemon['base_experience'];

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
    let abil = currentPokemon['abilities']; 
    for (let j = 0; j < abil.length; j++) {
        let ab = abil[j];
        abPokRow.innerHTML += /*html*/  `<span>${ab['ability']['name']}</span><br>`;
    }
}

function renderBaseStats(singlePokemon, i) {
    singlePokemon = allPokemons[i];

    document.getElementById('baseStates').classList.remove('d-none');
    document.getElementById('aboutTab').classList.remove('selectedItem');
    document.getElementById('moveTab').classList.remove('selectedItem');
    document.getElementById('about').classList.add('d-none');
    document.getElementById('moves').classList.add('d-none');
    document.getElementById('baseTab').classList.add('selectedItem');

  //  currentPokemon['stats'].length // 6
  //  currentPokemon['stats'][0]['base_stat'] // für ersten 55 
  //  currentPokemon['stats'][0]['stat']['name'] //hp

    let basesContainer = document.getElementById('baseStates');
    basesContainer.innerHTML = /*html*/  `
    <table class="table tableBaseStates">
        <tbody id="rows">
            
        </tbody>
    </table>
    `;

    let rowNumbers = currentPokemon['stats'].length;
    let rowGenerate = document.getElementById('rows');

    for (let j = 0; j < rowNumbers; j++) {

        let percent = currentPokemon['stats'][j]['base_stat'];
        rowGenerate.innerHTML += /*html*/ `
        <tr>
                <th id="rowName" scope="row" class="baseText">${currentPokemon['stats'][j]['stat']['name']}</th>
                <td>
                    <div id="colorStatus" class="progress" role="progressbar"
                    aria-label="striped example" aria-valuenow="10"
                    aria-valuemin="0" aria-valuemax="100">
                        <div id="rowWidth${j}" class="progress-bar progress-bar-striped">${percent}%</div>
                    </div>
                </td>
        </tr>
        `;
        document.getElementById(`rowWidth${j}`).style = `width: ${percent}%`;

     /*    if (percent <= 20) { document.getElementById('colorStatus').setAttribute('aria-label', 'Warning') }
    
        if (percent > 20 && <= 40) {Warning}  
        {Default}
        */
    }
}

function renderMoves(i) {
    document.getElementById('moves').classList.remove('d-none');
    document.getElementById('aboutTab').classList.remove('selectedItem');
    document.getElementById('baseTab').classList.remove('selectedItem');
    document.getElementById('about').classList.add('d-none');
    document.getElementById('baseStates').classList.add('d-none');
    document.getElementById('moveTab').classList.add('selectedItem');

    let moveLabels = document.getElementById('labelsMoves');
    let movePok = currentPokemon['moves']; 

    for (let j = 0; j < movePok.length; j++) {
        let move = movePok[j];
        moveLabels.innerHTML = '';
        moveLabels.innerHTML += /*html*/  `<span class="badge text-bg-bug">${move['move']['name']}</span>`;
    }
}