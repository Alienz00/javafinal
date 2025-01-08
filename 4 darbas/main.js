

const ekranas = document.getElementById('display');
const mygtukai = document.querySelectorAll('.btn');
let pirmasSkaicius = '';
let veiksmas = '';
let antrasSkaicius = '';

mygtukuKlausytojai(mygtukai, apdorotiSkaiciu, apdorotiVeiksma, atliktiSkaiciavima, isvalytiEkrana);

function mygtukuKlausytojai(mygtukai, apdorotiSkaiciu,
    apdorotiVeiksma, atliktiSkaiciavima, isvalytiEkrana) {
    mygtukai.forEach(mygtukas => {
        mygtukas.addEventListener('click', () => {
            const reiksme = mygtukas.textContent;
            if (mygtukas.classList.contains('number')) {
                apdorotiSkaiciu(reiksme);
            } else if (mygtukas.classList.contains('operator')) {
                apdorotiVeiksma(reiksme);
            } else if (mygtukas.id === 'equals') {
                atliktiSkaiciavima();
            } else if (mygtukas.id === 'clear') {
                isvalytiEkrana();
            } else if (mygtukas.id === 'root') {
                trauktiSakni();
            } else if (mygtukas.id === 'percent') {
                procentai();
            } else if (mygtukas.id === 'delete') {
                istrintiPaskutini();
            }
        });
    });
}

function apdorotiSkaiciu(skaicius) {
    if (veiksmas === '') {
    pirmasSkaicius += skaicius;
    atnaujintiEkrana(skaicius);
    } else {
        antrasSkaicius += skaicius;
        atnaujintiEkrana(skaicius);
    }
}

 function apdorotiVeiksma(veiksmai) {
    if (pirmasSkaicius === '') return;
  veiksmas = veiksmai;
  atnaujintiEkrana(veiksmai);
}
    
function atliktiSkaiciavima() {
    let rezultatas;
    const pirmas = parseFloat(pirmasSkaicius);
    const antras = parseFloat(antrasSkaicius);

    if (isNaN(pirmas) || isNaN(antras)) return;

    switch (veiksmas) {
        case '+':
            rezultatas = atliktiSudetis(pirmas, antras);
            break;
        case '-':
            rezultatas = atliktiAtimtis(pirmas, antras);
            break;
        case '*':
            rezultatas = atliktiDaugyba(pirmas, antras);
            break;
        case '/':
            rezultatas = atliktiDalyba(pirmas, antras);
            break;
        case '%':
            rezultatas = procentai(pirmas, antras);
            break;
        default:
            return;        
    }
    atnaujintiEkrana(rezultatas);
    pirmasSkaicius = rezultatas.toString();
    antrasSkaicius = '';
    veiksmas = '';
}

function atnaujintiEkrana(rezultatas) {
    ekranas.textContent = rezultatas;
}

function isvalytiEkrana() {
    pirmasSkaicius = '';
    veiksmas = '';
    antrasSkaicius = '';
    atnaujintiEkrana('0');
}

function atliktiSudetis(pirmas, antras) {
    return pirmas + antras;
}

function atliktiAtimtis(pirmas, antras) {
    return pirmas - antras;
}

function atliktiDaugyba(pirmas, antras) {
    return pirmas * antras;
}

function atliktiDalyba(pirmas, antras) {
    return pirmas / antras;
}

function procentai(pirmas, antras) {
    return (pirmas / 100) * antras;
}

function trauktiSakni() {
    if (veiksmas === '') {
        pirmasSkaicius = Math.sqrt(parseFloat(pirmasSkaicius)).toString();
        atnaujintiEkrana(pirmasSkaicius);
    } else {
        antrasSkaicius = Math.sqrt(parseFloat(antrasSkaicius)).toString();
        atnaujintiEkrana(antrasSkaicius);
    }
}

function istrintiPaskutini() {
    if (veiksmas === '') {
        pirmasSkaicius = pirmasSkaicius.slice(0, -1);
        atnaujintiEkrana(pirmasSkaicius || '0');
    } else {
        antrasSkaicius = antrasSkaicius.slice(0, -1);
        atnaujintiEkrana(antrasSkaicius || '0');
    }
}