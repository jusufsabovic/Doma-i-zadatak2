const pitanja = [
    {
        pitanje: "Ko je osnivač kompanije <em>Apple</em>?", 
        odgovori: {
            a: "Bil Gejts",
            b: "Ilon Mask",
            c: "Stiv Džobs"
        },
        tacanOdgovor: "c"
    },
    {
        pitanje: "Kako se zvala prva programerka? Jedan progamski jezik nosi njeno ime.",
        odgovori: {
            a: "Ada Bajron",
            b: "Karmen Elektra",
            c: "Java Script"
        },
        tacanOdgovor: "a"
    },
    {
        pitanje: "Kako se zove čuveni naučnik o kome govori film <em>The Immitation Game</em>?",
        odgovori: {
            a: "Nikola Tesla",
            b: "Alen Tjuring",
            c: "Tomas Edison"
        },
        tacanOdgovor: "b"
    },
        {
        pitanje: "Koje godine je osmišljena prva računarska igra? ",
        odgovori: {
            a: "1961.",
            b: "1990.",
            c: "1978."
        },
        tacanOdgovor: "a"
    },
        {
        pitanje: "Kako se zove preteča računara?",
        odgovori: {
            a: "Albatros",
            b: "Abakus",
            c: "Austrolopitekus"
        },
        tacanOdgovor: "b"
    },
        {
        pitanje: "Prvi osmišljeni programski jezik bio je:  ",
        odgovori: {
            a: "Programski jezik C",
            b: "Python",
            c: "Fortran"
        },
        tacanOdgovor: "c"
    }
];

const kvizDiv = document.getElementById('kviz'); 
const rezultatDiv = document.getElementById('rezultat'); 
const zavrsiBtn = document.getElementById('zavrsi'); 

function pokreniKviz(){
    const output = [];

    pitanja.forEach(function(trenutnoPitanje, pitanjeInd){
    const odgovori = []; 
    for(slovo in trenutnoPitanje.odgovori){
        odgovori.push(
        `<label>
            <input type="radio" name="odgovor${pitanjeInd}" value="${slovo}" >
            ${slovo} : ${trenutnoPitanje.odgovori[slovo]}
        </label>`
        );
    }

    output.push(
        `
        <div class="pitanje">${trenutnoPitanje.pitanje}</div>
        <div class="odgovori"> ${odgovori.join('')} </div>
        `
    );

});
    kvizDiv.innerHTML = output.join('');
}


function prikaziRezultat(){
    let brTacnih = 0;

    const inputDisable = document.querySelectorAll('input[type=radio]');
    inputDisable.forEach(odgovor => {
        console.log(odgovor);
        odgovor.disabled = true;
    });

    const timerDiv = document.querySelector('#timer');  
    timerDiv.style.display = "none";
    clearInterval(interval);

    pitanja.forEach(function(trenutnoPitanje, pitanjeInd){
    const selektor = `input[name=odgovor${pitanjeInd}]:checked`;
    const odgovoreno = (document.querySelector(selektor) || {} ).value;

    const nizPitanja = document.querySelectorAll('.pitanje'); 
    const textPitanja = nizPitanja[pitanjeInd]; 

    if(odgovoreno === trenutnoPitanje.tacanOdgovor){
        brTacnih++;
        textPitanja.style.color = "green"; 
    } else {
        textPitanja.style.color = "red"; 
    }
});
    rezultatDiv.innerHTML = `rezultat: <h3>${brTacnih} od ${pitanja.length}</h3>`;
}


function tajmer() {
    const timerDiv = document.querySelector('#timer');  

    if (time == 0) {
        prikaziRezultat();
        clearInterval(interval);
        timerDiv.style.display = "none";
    } else {
        time -= 1;
    }

    timerDiv.innerHTML = `${time}s`;
}

var time = 60; 
pokreniKviz();
var interval = setInterval(tajmer, 1000); 
zavrsiBtn.addEventListener('click', prikaziRezultat);