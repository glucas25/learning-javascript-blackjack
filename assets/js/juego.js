/**
 * 2C= Two of Clubs
 * 2D= Two of Diamonds
 * 2H= Two of Hearts
 * 2S= Two of Spades
 */

(()=>{
    'use strict'
    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];

    const puntosHTML = document.querySelectorAll('small'),
        divCartasJugadores = document.querySelectorAll('.divCartas');

    const btnPedir = document.querySelector('#btnPedirCarta'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevo = document.querySelector('#btnNuevoJuego');

    //Funcion inicializar juego
    const inicializarJuego = (numJugadores = 2) =>{
        puntosJugadores=[]
        deck = crearDeck();
        for (let i=0;i<numJugadores;i++){
            puntosJugadores.push(0)

        }
        //Reiniciar el conteo de los puntajes
        puntosHTML.forEach(elem => elem.innerText = 0);
        //Limpiar el panel de las cartas
        divCartasJugadores.forEach(d => d.innerHTML = '');

        console.clear();
        btnPedir.disabled = false;
        btnDetener.disabled = false;

        console.log(puntosJugadores);
    }

    //Funcion para crear una nueva baraja
    const crearDeck =() => {
        deck=[];
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
        return _.shuffle(deck);
    }

    const pedirCarta = () => {
        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }
        return deck.pop();
    }
    //Obtiene el valor numerico de la carta
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ?
        (valor === 'A') ? 11 : 10 : valor * 1;
    }

    //Turno:0 = Primer jugador y el ultimo para la computadora
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = (puntosJugadores[turno] + valorCarta(carta));
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    //Turno de la computadora
    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora=0;
        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length-1);
            divCartasJugadores[puntosJugadores.length-1].innerHTML += `<img class="carta" src="assets/cartas/${carta}.png"></img>`;
        } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);
        determinarGanador();
    }

    const determinarGanador = () => {
        const [puntosJugador, puntosComputadora] = puntosJugadores;
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
        const puntosJugador = acumularPuntos(carta,0)

        //OPCION ALTERNATICA -  CREAR ELEMENTO IMG Y AGREGARLO AL DIV
        // const imgCarta = document.createElement('img');
        // imgCarta.src = `assets/cartas/${carta}.png`;
        // imgCarta.classList.add('carta');
        // divJugadorCartas.append(imgCarta);

        divCartasJugadores[0].innerHTML += `<img class="carta" src="assets/cartas/${carta}.png"></img>`;

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
        turnoComputadora(puntosJugadores[0]);
    });

    btnNuevo.addEventListener('click', () => {
        inicializarJuego();
    });

    inicializarJuego()
})();