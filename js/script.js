let quantidadeCartas = undefined;

function perguntaQuantidadeCartas() {
    let inputQuantidadeCartas = prompt(`
    PARROT CARD GAME 🦜
    
    Com quantas cartas deseja jogar?
    
    Digite um número PAR de 4️⃣ a 1️⃣4️⃣:
    `);

    //Cobrindo os casos onde é apertado o Botão OK no prompt, ou o Cancel, respectivamente
    if (inputQuantidadeCartas === null || inputQuantidadeCartas === "") {
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

alert(`


Quantidade de cartas escolhida: ${quantidadeCartas}
TUTORIAL:
`);




