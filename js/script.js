let quantidadeCartas = undefined;

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

quantidadeCartas = perguntaQuantidadeCartas();

const quantidadeEmEmoji = {
    4: "4️⃣",
    6: "6️⃣",
    8: "8️⃣",
    10: "1️⃣0️⃣",
    12: "1️⃣2️⃣",
    13: "1️⃣3️⃣",
    14: "1️⃣4️⃣"
};

alert(`
PARROT CARD GAME 🦜

Quantidade de cartas escolhida: ${quantidadeEmEmoji[quantidadeCartas]}

- - - - - - - - TUTORIAL: - - - - - - - -
As cartas apresentam um PARROT 🦜 que se mexe, no verso;
Cada PARROT 🦜 se repete em duas peças diferentes;
Você deve, em cada rodada, virar apenas duas peças;
Caso os PARROTS 🦜 sejam iguais, as cartas permanecem viradas;
Se os PARROTS 🦜 forem diferentes, estas serão viradas novamente;
Ganhe o jogo virando todas as cartas no menor tempo possível.  

⚠️DESVIRE A PRIMEIRA CARTA PRA INICIAR O CRONÔMETRO!⚠️
`);

const parrots = ["bobross","explody","fiesta","metal","revertit","triplets","unicorn"];

let cartasNaMesa = [];

while (cartasNaMesa.length < quantidadeCartas) {
    let parrotDaVez = parrots[Math.floor(Math.random() * 7 )];
    if ( !( cartasNaMesa.includes(parrotDaVez) ) ) {
        cartasNaMesa.push(parrotDaVez);
        cartasNaMesa.push(parrotDaVez);   
    }
}

function comparador() {
    return Math.random() - 0.5;
}

cartasNaMesa.sort(comparador);

alert(cartasNaMesa);

for (let elem of cartasNaMesa) {
    const ul = document.querySelector(".cartas-na-mesa");
    ul.innerHTML += `
    <li>
        <div class="carta" onclick="virarCarta(this)">
            <div class="face-dianteira face">
                <img src="./img/back.png">
            </div>
            <div class="face-traseira face">
                <img src="./img/${String(elem)}parrot.gif">
            </div>
        </div>
    </li>
    `;
}

let cartasViradas = 0;

let carta1;
let carta2;

let contadorJogadas = 0;

//evitar bug de virar uma terceira carta enquanto duas cartas desviram
function reiniciaRodada() {
    carta1 = undefined;
    carta2 = undefined;
    cartasViradas = 0;
}

function analisarCartasViradas(){
    if (carta1.innerHTML === carta2.innerHTML) {
        reiniciaRodada();
    } else {
        carta1.classList.remove("virada");
        carta2.classList.remove("virada");
        setTimeout(reiniciaRodada, 501);
    }
};



function virarCarta(carta) {

    contadorJogadas++;

    if (cartasViradas === 0) {
        carta.classList.add("virada");
        carta1 = carta;
        cartasViradas++;
    } else if (cartasViradas === 1) {
        carta.classList.add("virada");
        carta2 = carta;
        cartasViradas++;
        setTimeout(analisarCartasViradas, 1000);
    }    
    /*
    if (!(carta.classList.includes("virada"))) {
        if (cartasViradas === 0) {
            carta.classList.add("virada");
            carta1 = carta;
            cartasViradas++;
        } else if (cartasViradas === 1) {
            carta.classList.add("virada");
            carta2 = carta;
            cartasViradas++;
            setTimeout(1000, analisarCartasViradas())
        }        
    }*/
}

if (document.querySelectorAll(".virada").length === quantidadeCartas) {
    alert("Você ganhou em X jogadas!");
}