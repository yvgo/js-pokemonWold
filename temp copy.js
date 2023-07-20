/* All Pokemons */

function allPokemonsTableTemp(i, currentPokemon) {
    return /*html*/ `
    <div id="singlePok${i}" class="singleBox" onclick="renderSinglePokemon(${i})">
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
}


/* Single Pokemon Infos */

function pokemonInfoTemp(i) {
    return /*html*/ `
    <!-- <div id="dialog" class="dialog-bg" onclick="closeSinglePokemon(${i})"> -->
    <div id="dialog" class="dialog-bg">
        <div id="imgBox${i}" class="dialogBox">
            <div class="navTop">
                <img id="navBevore" class="navLeft" src="./img/icons/nextLeft.png" onclick="beforeSinglePokemon(${i})">
                <img id="navigationTop" class="navTopImg" src="./img/icons/cancel.png" onclick="closeSinglePokemon(${i})">
                <img id="navNext"  class="navRight" src="./img/icons/next.png" onclick="nextSinglePokemon(${i})">
            </div>
            <div class="cardHeader">
                <div class="figurePosition ">
                    <img id="figure" class="figSize">
                </div>
            </div>
            <div class="infoContainer">
                <div class="pokHeader">
                    <div id="pokID" class="pokNr"></div>
                    <div id="pokemonName" class="pokName"></div>
                    <div id="labels${i}" class="label">
                    </div>
                </div>
                <div id="pokInfo" class="pokInfo">
                    <div class="hstack gap-5">
                        <div id="pokInfoNavi">
                        </div>
                    </div>
                    <div class="details">
                        <div id="about" class="pokAbout d-none"> </div>
                        <div id="baseStates" class="pokBase d-none"> </div>
                        <div id="moves" class="pokMoves d-none">
                            <div id="labelsMoves" class="pokMoveLabels"> </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}

// tab navi
function tabNavTemp(i) {
    return /*html*/ `
    <div class="hstack gap-5">
        <div id="aboutTab" class="tabText" onclick="renderAbout(${i})">About</div>
        <div id="baseTab" class="tabText" onclick="renderBaseStats(${i})">Base Stats</div>
        <div id="moveTab" class="tabText" onclick="renderMoves(${i})">Moves</div>
    </div>
    `; 
}

//about
function aboutTableTemp(heightPok, weightPok, expPok) {
    return /*html*/  `
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
}

function aboutRowsFor(abPokRow, abil) {
    for (let j = 0; j < abil.length; j++) {
        let ab = abil[j];
        abPokRow.innerHTML += /*html*/  `<span>${ab['ability']['name']}</span><br>`;
    }
}

function addRemoveClassesAbout() {
    document.getElementById('about').classList.remove('d-none');
    document.getElementById('moveTab').classList.remove('selectedItem');
    document.getElementById('baseTab').classList.remove('selectedItem');
    document.getElementById('moves').classList.add('d-none');
    document.getElementById('baseStates').classList.add('d-none');
    document.getElementById('aboutTab').classList.add('selectedItem');
}

//baseStats
function baseStatsTempTable() {
    return `
    <table class="table tableBaseStates">
        <tbody id="rows">
            
        </tbody>
    </table>
    `;
}
    
function rowsBaseStatsFor(rowNumbers, rowGenerate) {
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
    }
}

function addRemoveClassesBaseStats() {
    document.getElementById('baseStates').classList.remove('d-none');
    document.getElementById('aboutTab').classList.remove('selectedItem');
    document.getElementById('moveTab').classList.remove('selectedItem');
    document.getElementById('about').classList.add('d-none');
    document.getElementById('moves').classList.add('d-none');
    document.getElementById('baseTab').classList.add('selectedItem');
}

//moves
function movesFor(moveLabels, movePok) {
    for (let j = 0; j < movePok.length; j++) {
        let move = movePok[j];
        moveLabels.innerHTML += /*html*/  `<span class="badge bgMoves">${move['move']['name']}</span>`;
    }
}

function addRemoveClassesMoves() {
    document.getElementById('moves').classList.remove('d-none');
    document.getElementById('aboutTab').classList.remove('selectedItem');
    document.getElementById('baseTab').classList.remove('selectedItem');
    document.getElementById('about').classList.add('d-none');
    document.getElementById('baseStates').classList.add('d-none');
    document.getElementById('moveTab').classList.add('selectedItem');
}


/* background-color */

// background-color-container
function bgColorFor(bgColPok, types) {

    for (let j = 0; j < 1; j++) {

        if (types[j]['type']['name'] == 'normal') {
            bgColPok.classList.add('pogBGNormal');
        } 
        if (types[j]['type']['name'] == 'water') {
            bgColPok.classList.add('pogBGWater');
        } 
        if (types[j]['type']['name'] == 'bug') {
            bgColPok.classList.add('pogBGBug');
        } 
        if (types[j]['type']['name'] == 'poison') {
            bgColPok.classList.add('pogBGPoison');
        } 
        if (types[j]['type']['name'] == 'psychic') {
            bgColPok.classList.add('pogBGPoison');
        } 
        if (types[j]['type']['name'] == 'electric') {
            bgColPok.classList.add('pogBGElectric');
        } 
        if (types[j]['type']['name'] == 'grass') {
            bgColPok.classList.add('pogBGGrass');
        } 
        if (types[j]['type']['name'] == 'fire') {
            bgColPok.classList.add('pogBGFire');
        } 
            if (types[j]['type']['name'] == 'ground') {
            bgColPok.classList.add('pogBGGround');
        } 
        if (types[j]['type']['name'] == 'fairy') {
            bgColPok.classList.add('pogBGFairy');
        }
    }
}

// background-color-labels
function bgColorLabelsFor(label, types) {

    for (let j = 0; j < types.length; j++) {

        if (types[j]['type']['name'] == 'normal') {
            label.innerHTML +=   `<span class="badge pogBGLabelNormal">${types[j]['type']['name']}</span>`;
        } 
        if (types[j]['type']['name'] == 'water') {
            label.innerHTML +=   `<span class="badge pogBGLabelWater">${types[j]['type']['name']}</span>`;
        } 
        if (types[j]['type']['name'] == 'flying') {
            label.innerHTML +=   `<span class="badge pogBGLabelWater">${types[j]['type']['name']}</span>`;
        } 
        if (types[j]['type']['name'] == 'bug') {
            label.innerHTML +=   `<span class="badge pogBGLabelBug">${types[j]['type']['name']}</span>`;
        } 
        if (types[j]['type']['name'] == 'poison') {
            label.innerHTML +=   `<span class="badge pogBGLabelPoison">${types[j]['type']['name']}</span>`;
        } 
        if (types[j]['type']['name'] == 'psychic') {
            label.innerHTML +=   `<span class="badge pogBGLabelPoison">${types[j]['type']['name']}</span>`;
        }
        if (types[j]['type']['name'] == 'electric') {
            label.innerHTML +=   `<span class="badge pogBGLabelElectric">${types[j]['type']['name']}</span>`;
        } 
        if (types[j]['type']['name'] == 'grass') {
            label.innerHTML +=   `<span class="badge pogBGLabelGrass">${types[j]['type']['name']}</span>`;
        } 
        if (types[j]['type']['name'] == 'fire') {
            label.innerHTML +=   `<span class="badge pogBGLabelFire">${types[j]['type']['name']}</span>`;
        } 
        if (types[j]['type']['name'] == 'ground') {
            label.innerHTML +=   `<span class="badge pogBGLabelGround">${types[j]['type']['name']}</span>`;
        } 
        if (types[j]['type']['name'] == 'rock') {
            label.innerHTML +=   `<span class="badge pogBGLabelGround">${types[j]['type']['name']}</span>`;
        } 
        if (types[j]['type']['name'] == 'steel') {
            label.innerHTML +=   `<span class="badge pogBGLabelGround">${types[j]['type']['name']}</span>`;
        } 
        if (types[j]['type']['name'] == 'fairy') {
            label.innerHTML +=   `<span class="badge pogBGLabelFairy">${types[j]['type']['name']}</span>`;
        } 
    }
}