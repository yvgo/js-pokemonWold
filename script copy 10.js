let firstPokemons = 20;
let currentPokemon;
let amountPokemons = 0;
let allPokemons = [];
let loading = false;
let morePokemons = 0;
let url = `https://pokeapi.co/api/v2/ability/?offset=${amountPokemons}&limit=20`;


function renderPage() {
    renderHeader();
    loadPokemons();
}

function renderHeader() {
    let head = document.getElementById('header');
    head.innerHTML = '';
    head.innerHTML = headerTemp();
}

async function loadPokemons(amountPokemons) {
    url = `https://pokeapi.co/api/v2/ability/?offset=${amountPokemons}&limit=20`;
    let response = await fetch(url);
    actualPokemons = await response.json();
    console.log(actualPokemons);
    for (let i = 1; i <= actualPokemons; i++) {
        let pokURL = actualPokemons;
        pokURL = `https://pokeapi.co/api/v2/pokemon/${i}/`;
        let pokResponse = await fetch(pokURL);
        currentPokemon = await pokResponse.json();
        allPokemons.push(currentPokemon);
    }

    console.log(url);
    renderAllPokemons();
}

window.onscroll = async function () {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight && !loading) {
        loading = true;
        amountPokemons += 20;
        await loadPokemons(amountPokemons);
        loading = false;
    }
}

function renderAllPokemons() {
    let poks = document.getElementById('allPoks');
    poks.innerHTML = '';

    for (let i = 0; i < allPokemons.length; i++) {
        currentPokemon = allPokemons[i];
        poks.innerHTML += allPokemonsTableTemp(i, currentPokemon);

        let bgColPok = document.getElementById(`singlePok${i}`);
        let label = document.getElementById(`labelsAll${i}`);
        let types = currentPokemon['types'];

        bgColorFor(bgColPok, types); // background-color
        bgColorLabelsFor(label, types); // background-color-labels
    }
}

function filterPoks() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();

    let findPoks = document.getElementById('allPoks');
    findPoks.innerHTML = '';

    for (let i = 0; i < allPokemons.length; i++) {
        currentPokemon = allPokemons[i];
        
        if ((currentPokemon['name']).toLowerCase().includes(search)) {
            findPoks.innerHTML += allPokemonsTableTemp(i, currentPokemon);

            let bgColPok = document.getElementById(`singlePok${i}`);
            let label = document.getElementById(`labelsAll${i}`);
            let types = currentPokemon['types'];

            bgColorFor(bgColPok, types); // background-color
            bgColorLabelsFor(label, types); // background-color-labels
        }
    }
}

function renderSinglePokemon(i, event) {
    currentPokemon = allPokemons[i];
    noScroll();
    renderPokemonInfo(i, event);
    renderAbout(i);
}

function renderPokemonInfo(i) {
    currentPokemon = allPokemons[i];

    let poxBox = document.getElementById('singlePokContainer');
    poxBox.innerHTML = '';
    poxBox.innerHTML += pokemonInfoTemp(i);

    document.getElementById('pokID').innerHTML = '#' + currentPokemon['id'];
    document.getElementById('pokemonName').innerHTML = currentPokemon['name'];
    document.getElementById('figure').src = currentPokemon['sprites']['other']['official-artwork']['front_default'];

    let bgColPok = document.getElementById(`imgBox${i}`);
    let label = document.getElementById(`labels${i}`);
    let types = currentPokemon['types'];

    bgColorFor(bgColPok, types);  // background-color
    bgColorLabelsFor(label, types);  // background-color-labels

}

function renderAbout(i) {
    currentPokemon = allPokemons[i];

    addRemoveClassesAbout();

    let heightPok = currentPokemon['height'];
    let weightPok = currentPokemon['weight'];
    let expPok = currentPokemon['base_experience'];

    let aboutContainer = document.getElementById('about');
    aboutContainer.innerHTML = '';
    aboutContainer.innerHTML = aboutTableTemp(heightPok, weightPok, expPok);

    let abPokRow = document.getElementById('abilitiesPok');
    let abil = currentPokemon['abilities'];
    aboutRowsFor(abPokRow, abil); // about rows   
}

function renderBaseStats(i) {
    currentPokemon = allPokemons[i];
    addRemoveClassesBaseStats();

    let basesContainer = document.getElementById('baseStates');
    basesContainer.innerHTML = '';
    basesContainer.innerHTML = baseStatsTempTable();

    let rowNumbers = currentPokemon['stats'].length;
    let rowGenerate = document.getElementById('rows');
    rowsBaseStatsFor(rowNumbers, rowGenerate); //  BaseStats rows
}

function renderMoves(i) {
    currentPokemon = allPokemons[i];
    addRemoveClassesMoves();

    let moveLabels = document.getElementById('labelsMoves');
    moveLabels.innerHTML = '';
    let movePok = currentPokemon['moves'];
    movesFor(moveLabels, movePok);
}

function noScroll() {
    document.documentElement.style.overflow = 'hidden';
    document.body.scroll = "no";
}

function reScroll() {
    document.documentElement.style.overflow = 'scroll';
    document.body.scroll = "yes";
}

function closeSinglePokemon(i) {
    document.getElementById(`labels${i}`).innerHTML = '';
    document.getElementById('dialog').classList.add('d-none');
    reScroll();
}

function nextSinglePokemon(i) {
    closeSinglePokemon(i);
    i++;
    renderSinglePokemon(i);
    if (i == (allPokemons.length - 1)) {
        document.getElementById('navNext').classList.add('imgUnvisible');
        document.getElementById('navNext').removeAttribute("onclick");
    }
}

function beforeSinglePokemon(i) {
    closeSinglePokemon(i);
    i--;
    renderSinglePokemon(i);
    if (i === 0) {
        document.getElementById('navBevore').classList.add('imgUnvisible');
        document.getElementById('navBevore').removeAttribute("onclick");
    }
}

function doNotClose(event) {
    event.stopPropagation();
}