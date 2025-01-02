document.addEventListener('DOMContentLoaded', () => {
    const korteles = document.querySelectorAll('.bendra');
    const simboliai = ['🍎', '🍇', '🍒', '🍍'];
    let pasirinkimai = [];
    let pasirinkimuId = [];
    let porosSurastos = [];
    let bandymuSkaicius = 0;

    // Funkcija, kuri sumaišo simbolius
    function sumaisytiSimbolius() {
        let dvigubiSimboliai = simboliai.concat(simboliai);
        dvigubiSimboliai.sort(() => 0.5 - Math.random());
        return dvigubiSimboliai;
    }

    // Funkcija, kuri priskiria simbolius kortelėms
    function priskirtiSimbolius() {
        let sumaisyti = sumaisytiSimbolius();
        korteles.forEach((kortele, index) => {
            kortele.setAttribute('data-simbolis', sumaisyti[index]);
        });
    }

    // Funkcija, kuri apverčia kortelę
    function apverstiKortele() {
        let pasirinkimas = this;
        let simbolis = pasirinkimas.getAttribute('data-simbolis');
        pasirinkimas.innerHTML = simbolis;
        pasirinkimas.classList.add('atversta');
        pasirinkimai.push(simbolis);
        pasirinkimuId.push(pasirinkimas.id);

        if (pasirinkimai.length === 2) {
            bandymuSkaicius++;
            document.getElementById('devintas').innerHTML = `Bandymas: ${bandymuSkaicius}`;
            setTimeout(patikrintiAtitikima, 1000);
        }
    }

    // Funkcija, kuri patikrina ar pasirinktos kortelės sutampa
    function patikrintiAtitikima() {
        let kortele1 = document.getElementById(pasirinkimuId[0]);
        let kortele2 = document.getElementById(pasirinkimuId[1]);

        if (pasirinkimai[0] === pasirinkimai[1]) {
            porosSurastos.push(pasirinkimai);
            kortele1.removeEventListener('click', apverstiKortele);
            kortele2.removeEventListener('click', apverstiKortele);
        } else {
            kortele1.innerHTML = '';
            kortele2.innerHTML = '';
            kortele1.classList.remove('atversta');
            kortele2.classList.remove('atversta');
            
        }

        pasirinkimai = [];
        pasirinkimuId = [];
    }


    priskirtiSimbolius();
    korteles.forEach(kortele => {
        if (kortele.id !== 'devintas') {
            kortele.addEventListener('click', apverstiKortele);
        }
    });
});