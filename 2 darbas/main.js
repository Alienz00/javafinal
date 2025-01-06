// Sukurkite password generatorių, kuris leistų 
// vartotojui:
// o Pasirinkit kiek simbolių norės kad būtų 
// slaptažodyje
// o Ar būtų didžiosios raidės
// o Ar būtų skaičiai
// o Ar būtų simboliai
// o Leistų sugeneruotą slaptažodį nusikopijuoti 
// vieno mygtuko paspaudimu

function sukurti() {
    const ilgis = document.getElementById('ilgis').value;
    if (ilgis > 30) {
        alert('Slaptažodis per ilgas');
        ilgis = 30;
    }
            const pazymetaDidziosios = document.getElementById('didziosios').checked;
            const pazymetaSkaiciai = document.getElementById('skaiciai').checked;
            const pazymetaSimboliai = document.getElementById('simboliai').checked;

            const mazosiosR = 'abcdefghijklmnopqrstuvwxyz';
            const didziosiosR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const skaiciai = '0123456789';
            const simboliai = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

            let characters = mazosiosR;
    if (pazymetaDidziosios) characters += didziosiosR;
    if (pazymetaSkaiciai) characters += skaiciai;
    if (pazymetaSimboliai) characters += simboliai;

            let password = '';
            for (let i = 0; i < ilgis; i++) {
                const slaptazodzioKurimas = Math.floor(Math.random() * characters.length);
                password += characters[slaptazodzioKurimas];
            }

            document.getElementById('slaptazodis').value = password;
        }

        function isiminti() {
            const passwordField = document.getElementById('slaptazodis');
            navigator.clipboard.writeText(passwordField.value).then(() => {
                const copyButton = document.querySelector('button[onclick="isiminti()"]');
        copyButton.classList.add('kopijuota');
        copyButton.textContent = 'Įsiminta!';
            }).catch(err => {
                console.error('Klaida kopijuojant slaptazodi: ', err);
            })
        }