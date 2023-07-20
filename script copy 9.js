let firstPokemons = 20;
let currentPokemon;
let allPokemons = [];
let loading = false;
let morePokemons = 0;
let nextPokemonList = 'https://pokeapi.co/api/v2/ability/?offset=40&limit=20';

function renderPage() {
    renderHeader();
    loadPokemons();
}

function renderHeader() {
    let head = document.getElementById('header');
    head.innerHTML = '';
    head.innerHTML = headerTemp();
}

async function loadPokemons() {
    for (let i = 1; i <= firstPokemons; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        allPokemons.push(currentPokemon);
    }
    renderAllPokemons();
}

async function loadMorePokemons(morePokemons) {
    for (let i = (morePokemons - 20); i <= morePokemons; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        allPokemons.push(currentPokemon);
    }
    renderMorePokemons(morePokemons);
}

window.onscroll = function () {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight && !loading) {
        loading = true;
        morePokemons = morePokemons + 20;
        loadMorePokemons(morePokemons);
        loading = false;
    }
}

function renderAllPokemons() {
    let poks = document.getElementById('allPoks');

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

function renderMorePokemons(morePokemons) {
    let poks = document.getElementById('allPoks');
    allPokemons.slice(2).slice(-20);
    morePokemons += 1;

    for (let i = (morePokemons - 20); i <= allPokemons.length ; i++) {
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