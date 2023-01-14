function perguntaQuantidadeCartas() {
    let inputQuantidadeCartas = prompt(`
    PARROT CARD GAME 🦜
    
    Com quantas cartas deseja jogar?
    
    Digite um número PAR de 4️⃣ a 1️⃣4️⃣:
    `);

    //Cobrindo os casos onde é apertado o Botão OK no prompt, ou o Cancel, ou ainda qualquer input que não seja um numero inteiro, respectivamente
    if (inputQuantidadeCartas === null || inputQuantidadeCartas === "" || !(Number.isInteger(Number(inputQuantidadeCartas))) ) {
        return  perguntaQuantidadeCartas();
    }

    while (!(inputQuantidadeCartas % 2 === 0) || inputQuantidadeCartas < 4 || inputQuantidadeCartas > 14) {

        if (!(inputQuantidadeCartas % 2 === 0)) {
            alert(`
    Você digitou um número ÍMPAR! 

    Digite um número PAR pra iniciar o jogo.
            `);
        }

        if (inputQuantidadeCartas < 4) {
            alert(`
    Você digitou um número MENOR QUE 4️⃣! 

    Digite um número A PARTIR DE 4️⃣ pra iniciar o jogo.
            `);
        }

        if (inputQuantidadeCartas > 14) {
            alert(`
    Você digitou um número MAIOR QUE 1️⃣4️⃣! 

    Digite um número ATÉ O 1️⃣4️⃣ pra iniciar o jogo.
            `);
        }

        return  perguntaQuantidadeCartas();
    }

    return inputQuantidadeCartas;
}

const quantidadeEmEmoji = {
    4: "4️⃣",
    6: "6️⃣",
    8: "8️⃣",
    10: "1️⃣0️⃣",
    12: "1️⃣2️⃣",
    13: "1️⃣3️⃣",
    14: "1️⃣4️⃣"
};

function alertaInicial() {
    alert("debug");
     
    alert(`
    PARROT CARD GAME 🦜

    Quantidade de cartas escolhida: ${quantidadeEmEmoji[quantidadeCartas]}

    - - - - - - - - 🎓 TUTORIAL: 🎓 - - - - - - - -
    🦜 No verso de cada carta tem um PARROT;
    🦜 Há PARROTS repetidos em duas cartas;
    🦜 Você pode virar apenas duas peças por rodada;
    🦜 Se PARROTS forem iguais, as cartas permanecem viradas;
    🦜 Se forem diferentes, as cartas vão desvirar;
    🦜 Vire todas as cartas no menor tempo possível! 

    ⚠️DESVIRE A PRIMEIRA CARTA PRA INICIAR O CRONÔMETRO!⚠️
    `);

    while (cartasNaMesa.length < quantidadeCartas) {
        let parrotDaVez = parrots[Math.floor(Math.random() * 7 )];
        if ( !( cartasNaMesa.includes(parrotDaVez) ) ) {
            cartasNaMesa.push(parrotDaVez);
            cartasNaMesa.push(parrotDaVez);   
        }
    }
}

function comparador() {
    return Math.random() - 0.5;
}

function embaralharCartasNaMesa () {
    cartasNaMesa.sort(comparador);
}

function adicionaHTML() {
    for (let elem of cartasNaMesa) {
        const ul = document.querySelector(".cartas-na-mesa");
        ul.innerHTML += `
        <li>
            <div class="carta" onclick="virarCarta(this)" data-test="card">
                <div class="face-dianteira face">
                    <img src="./img/back.png" data-test="face-down-image">
                </div>
                <div class="face-traseira face">
                    <img src="./img/${String(elem)}parrot.gif" data-test="face-up-image">
                </div>
            </div>
        </li>
        `;
    }
}

function removeHTML() {
    const ul = document.querySelector(".cartas-na-mesa");
    ul.innerHTML = "";
}

let divCronometro = document.querySelector(".cronometro");
let contadorSegundos = 0;
let meuInterval;

function adicionaSegundo() {
    contadorSegundos++;
    divCronometro.innerHTML = contadorSegundos;
}

let cartasViradas = 0;
let carta1;
let carta2;
let contadorJogadas = 0;

function iniciarRodada() {
    cartasViradas = 0;
    carta1 = undefined;
    carta2 = undefined;
    contadorJogadas = 0;
    contadorSegundos = 0;
}

//evitar bug de virar uma terceira carta enquanto duas cartas desviram
function reiniciaRodada() {
    carta1 = undefined;
    carta2 = undefined;
    cartasViradas = 0;
}

function desviraCartas() {
    carta1.classList.remove("virada");
    carta2.classList.remove("virada");
}

function analisarCartasViradas(){
    if (carta1.innerHTML === carta2.innerHTML) {
        reiniciaRodada();
    } else {
        setTimeout(desviraCartas,1000);
        setTimeout(reiniciaRodada,1001);
    }
};



function virarCarta(carta) {
    if (contadorJogadas === 0) {
        meuInterval = setInterval(adicionaSegundo, 1000);
    }

    if ( !(carta.classList.contains("virada")) ) {
        if (cartasViradas === 0) {
            contadorJogadas++;
            carta.classList.add("virada");
            carta1 = carta;
            cartasViradas++;
        } else if (cartasViradas === 1) {
            contadorJogadas++;
            carta.classList.add("virada");
            carta2 = carta;
            cartasViradas++;
            analisarCartasViradas();
        }   
    }

    if (document.querySelectorAll(".virada").length === Number(quantidadeCartas) ) {
        clearInterval(meuInterval);

        alert(`Você ganhou em ${contadorJogadas} jogadas! A duração do jogo foi de ${contadorSegundos} segundos!`);

        let promptFinal = prompt(`
    Deseja jogar novamente?

    Digite "sim" ou "não":
        `);
        
        while (promptFinal !== "sim" && promptFinal !== "não") {
            if (promptFinal === '"sim"' || promptFinal === '"não"'){
                alert("SEM ASPAS, POR FAVOR...");
            }

            promptFinal = prompt(`
    Deseja jogar novamente?

    Digite APENAS "sim" ou "não":
            `);
        }
        
        if (promptFinal === "sim") {
            iniciarNovoJogo();
        }
    }
}

const parrots = ["bobross","explody","fiesta","metal","revertit","triplets","unicorn"];
let cartasNaMesa = [];
let quantidadeCartas;

function iniciarNovoJogo() {
    contadorSegundos = 0;
    divCronometro.innerHTML = contadorSegundos;

    removeHTML();

    cartasNaMesa = [];

    quantidadeCartas = perguntaQuantidadeCartas();

    alertaInicial();

    embaralharCartasNaMesa();

    adicionaHTML();

    iniciarRodada();
}

iniciarNovoJogo();