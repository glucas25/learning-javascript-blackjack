/**
 * 2C= Two of Clubs
 * 2D= Two of Diamonds
 * 2H= Two of Hearts
 * 2S= Two of Spades
 */


let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0,
puntosComputadora = 0;

const puntosHTML = document.querySelectorAll('small');
const divJugadorCartas = document.querySelector('#jugador-cartas');
const divComputadoraCartas = document.querySelector('#computadora-cartas');

const btnPedir = document.querySelector('#btnPedirCarta');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevoJuego');

const crearDeck =() => {
    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
    }
    for (let especial of especiales) {
        for (let tipo of tipos) {
            deck.push(especial + tipo);
        }
    }
    deck = _.shuffle(deck);
    //console.log(deck);
}



const pedirCarta = () => {
    if (deck.length === 0) {
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop();
   
    //console.log(deck);
    //console.log({carta});
    return carta;
}

//pedirCarta();

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ?
    (valor === 'A') ? 11 : 10 :
    valor * 1;
}


// const valor = valorCarta(pedirCarta());
// console.log({valor});

//Turno de la computadora
const turnoComputadora = (puntajeMinimo) => {
    console.log('Turno de la computadora');
    do {
        const carta = pedirCarta();

        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosHTML[1].innerText = puntosComputadora;
        divComputadoraCartas.innerHTML += `<img class="carta" src="assets/cartas/${carta}.png"></img>`;
    } while (puntosComputadora < puntajeMinimo && puntajeMinimo <= 21);

    revisarVictoria();
}


const revisarVictoria = () => {

    setTimeout(() => {
        if (puntosJugador === puntosComputadora) {
            console.warn('Nadie gana');
        } else if (puntosJugador > 21 && puntosComputadora > 21 || puntosJugador === puntosComputadora) {
            console.warn('Nadie gana');
        } else if (puntosComputadora > 21) {
            console.info('Jugador gana');
        } else if (puntosJugador > 21) {
            console.info('Computadora gana');
        } else {puntosJugador > puntosComputadora
            ? console.info('Jugador gana')
            : console.info('Computadora gana');
        }

    }, 100);
}

//Eventos


btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);

    puntosHTML[0].innerText = puntosJugador;

    //OPCION ALTERNATICA -  CREAR ELEMENTO IMG Y AGREGARLO AL DIV
    // const imgCarta = document.createElement('img');
    // imgCarta.src = `assets/cartas/${carta}.png`;
    // imgCarta.classList.add('carta');
    // divJugadorCartas.append(imgCarta);

    divJugadorCartas.innerHTML += `<img class="carta" src="assets/cartas/${carta}.png"></img>`;

    if (puntosJugador > 21) {
        //console.warn('Lo siento mucho, perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
        //console.warn('21, genial!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }
    
});

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener('click', () => {
    console.clear();
    deck = [];
    crearDeck();
    btnPedir.disabled = false;
    btnDetener.disabled = false;
    puntosJugador = 0;
    puntosComputadora = 0;
    puntosHTML[0].innerText = puntosJugador;
    puntosHTML[1].innerText = puntosComputadora;
    divJugadorCartas.innerHTML = '';
    divComputadoraCartas.innerHTML = '';
});


crearDeck();