// Naudojant ES6 klases sukurkite objekto User kūrimo konstruktorių,
//     kuris turės savybes pagal formos input‘us:
// - email;
// - name;
// - dar vieną papildomą savybę: isLoggedIn, kurios pradinė reikšmė yra false.
// Taip pat sukurkite tris metodus:
// - logout(); // metodas turi atspausdinti žinutę po forma – See ya next time!
// - login(); // metodas turi atspausdinti žinutę po forma – Welcome, name
// - toggleLoginStatus(); // metodas turi pakeisti savybės isLoggedIn reikšmę
// į priešingą.T.y.jei buvo false, tai iškvietus metodą pasidaro true ir vice
// versa

// - Įprastu būdu apsirašykite submit event, sustabdykite default naršyklės
// persikrovimą.

// - Išsisaugokite duomenis iš formos kintamuosiuose.

// - Sukurkite naują User objektą.

// - iškvieskite metodą toggleLoginStatus, kad pasikeistų isLoggedIn vertė.

// - consolėje pasitikrinkite ar vertė pasikeitė.

// - Apsirašykite tokią logiką:

// Jeigu isLoggedIn yra tiesa, sukurkite du naujus elementus: h1 ir button.

// h1 suteikite metodo login() grąžinamą tekstą.
// Mygtukui suteikite pavadinimą - logout.

// Atvaizduokite po forma esančiame div elemente su .message klase.

//     Ant logout mygtuko uždėkite click event.Paspaudimo metu isLoggedIn statusas
// vėl turi pasikeisti, ir jei iki šiol buvo true, tai turi būti false.

// Jeigu isLoggedIn statusas yra false, tuomet h1 tekstas turi būti logout metodo
// rezultatu.

//     Kiekvieną kartą paspaudus formos submit mygtuką visas papildomas tekstas turi
// išsivalyti.


document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();
    const formDuomenys = new FormData(event.target);
    const pastas = formDuomenys.get('email');
    const vardas = formDuomenys.get('name');

    const vartotojas = new Vartotojas(pastas, vardas);
    vartotojas.keistiBusena();
    localStorage.setItem('vartotojas', JSON.stringify(vartotojas));
    console.log(vartotojas, 'Ar vartotojas prisijungęs:', vartotojas.isLoggedIn);

    const zinute = document.querySelector('.message');
        zinute.innerHTML = '';
    
    if (vartotojas.isLoggedIn) {
        const h1 = document.createElement('h1');
        h1.innerHTML = vartotojas.prisijungti();
        zinute.appendChild(h1);

        const mygtukas = document.createElement('button');
        mygtukas.innerHTML = 'Logout';
        zinute.appendChild(mygtukas);

        mygtukas.addEventListener('click', function () {
            zinute.innerHTML = vartotojas.atsijungti();
            vartotojas.keistiBusena();
            localStorage.setItem('vartotojas', JSON.stringify(vartotojas));
            console.log(vartotojas);
        });
    }
});

class Vartotojas {
    constructor(pastas, vardas) {
        this.pastas = pastas;
        this.vardas = vardas;
        this.isLoggedIn = false;
    }

    keistiBusena() {
        this.isLoggedIn = !this.isLoggedIn;
    }

    prisijungti() {
        return `Sveiki,${this.vardas}`;
    }

    atsijungti() {
        return 'Iki pasimatymo'
    }
}
