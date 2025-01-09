
const ekranas = document.getElementById('display');
const mygtukai = document.querySelectorAll('.btn');
let pirmasSkaicius = '';
let veiksmas = '';
let antrasSkaicius = '';

mygtukuKlausytojai();

function mygtukuKlausytojai() {
    mygtukai.forEach(mygtukas => {
        mygtukas.addEventListener('click', () => {
            const reiksme = mygtukas.textContent;
            if (mygtukas.classList.contains('number') || reiksme === '.') {
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

function atnaujintiEkrana(rezultatas) {
    if (rezultatas.length <= 15) {
    ekranas.textContent = rezultatas;
    } else {
        ekranas.textContent = rezultatas.slice(0, 15);
    }
}

function apdorotiSkaiciu(skaicius) {
    if (skaicius === '.' && (veiksmas === '' ? pirmasSkaicius.includes('.') : antrasSkaicius.includes('.'))) {
        return;
    }

    if (veiksmas === '') {
        pirmasSkaicius += skaicius;
        atnaujintiEkrana(pirmasSkaicius);
    } else {
        antrasSkaicius += skaicius;
        atnaujintiEkrana(antrasSkaicius);
    }
}

 function apdorotiVeiksma(veiksmai) {
     if (pirmasSkaicius === '') return;
     if (antrasSkaicius !== '') {
         atliktiSkaiciavima();
     }
  veiksmas = veiksmai;
  atnaujintiEkrana(veiksmai);
}
    
function atliktiSkaiciavima() {
    let rezultatas;
    const pirmas = parseFloat(pirmasSkaicius);
    const antras = parseFloat(antrasSkaicius);

    if (isNaN(pirmas) || (veiksmas !== '√' && isNaN(antras))) return;

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
        case '√':
            rezultatas = Math.sqrt(pirmas, antras);
            break;
        default:
            return;        
    }
    rezultatas = rezultatas.toPrecision(15);

    rezultatas = parseFloat(rezultatas).toString();

    atnaujintiEkrana(rezultatas);
    pirmasSkaicius = rezultatas.toString();
    antrasSkaicius = '';
    veiksmas = '';
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
    let rezultatas;
    if (veiksmas === '') {
        rezultatas = Math.sqrt(parseFloat(pirmasSkaicius));
        pirmasSkaicius = rezultatas.toString();
        atnaujintiEkrana(pirmasSkaicius);
    } else {
        rezultatas = Math.sqrt(parseFloat(antrasSkaicius));
        antrasSkaicius = rezultatas.toString();
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