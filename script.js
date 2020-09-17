//booleanos que controlam se o jogo está rodando e na vez de quem está
let jogoRodando = true;
let vezDoX = true;

//atribuindo elementos do HTML em variáveis do JS
const quadrados = document.querySelectorAll(".quadrado");
const statusBox = document.querySelector(".status");
const botaoReiniciar = document.querySelector(".botao");

//variável que guarda o return de uma função com if/else (pra retornar o símbolo certo)
const gerarSimbolo = (letra) => letra === 'X' ? 'X' : 'O';

//verifica se alguém ganhou ou empatou e, se nenhum dos dois, continua revezando a vez entre X e O
const verificacaoStatus = function () {
  const superiorEsquerda = quadrados[0].classList[1];
  const superiorMeio = quadrados[1].classList[1];
  const superiorDireita = quadrados[2].classList[1];
  const meioEsquerda = quadrados[3].classList[1];
  const meioMeio = quadrados[4].classList[1];
  const meioDireita = quadrados[5].classList[1];
  const inferiorEsquerda = quadrados[6].classList[1];
  const inferiorMeio = quadrados[7].classList[1];
  const inferiorDireita = quadrados[8].classList[1];

  if (
    superiorEsquerda &&
    superiorEsquerda === superiorMeio &&
    superiorEsquerda === superiorDireita
  ) {
    atribuirVencedor(superiorEsquerda);
    quadrados[0].classList.add("ganhou");
    quadrados[1].classList.add("ganhou");
    quadrados[2].classList.add("ganhou");
  } else if (
    meioEsquerda &&
    meioEsquerda === meioMeio &&
    meioEsquerda === meioDireita
  ) {
    atribuirVencedor(meioEsquerda);
    quadrados[3].classList.add("ganhou");
    quadrados[4].classList.add("ganhou");
    quadrados[5].classList.add("ganhou");
  } else if (
    inferiorEsquerda &&
    inferiorEsquerda === inferiorMeio &&
    inferiorEsquerda === inferiorDireita
  ) {
    atribuirVencedor(inferiorEsquerda);
    quadrados[6].classList.add("ganhou");
    quadrados[7].classList.add("ganhou");
    quadrados[8].classList.add("ganhou");
  } else if (
    superiorEsquerda &&
    superiorEsquerda === meioMeio &&
    superiorEsquerda === inferiorDireita
  ) {
    atribuirVencedor(superiorEsquerda);
    quadrados[0].classList.add("ganhou");
    quadrados[4].classList.add("ganhou");
    quadrados[8].classList.add("ganhou");
  } else if (
    superiorDireita &&
    superiorDireita === meioMeio &&
    superiorDireita === inferiorEsquerda
  ) {
    atribuirVencedor(superiorDireita);
    quadrados[2].classList.add("ganhou");
    quadrados[4].classList.add("ganhou");
    quadrados[6].classList.add("ganhou");
  } else if (
    superiorEsquerda &&
    superiorEsquerda === meioEsquerda &&
    superiorEsquerda === inferiorEsquerda
  ) {
    atribuirVencedor(superiorEsquerda);
    quadrados[0].classList.add("ganhou");
    quadrados[3].classList.add("ganhou");
    quadrados[6].classList.add("ganhou");
  } else if (
    superiorMeio &&
    superiorMeio === meioMeio &&
    superiorMeio === inferiorMeio
  ) {
    atribuirVencedor(superiorMeio);
    quadrados[1].classList.add("ganhou");
    quadrados[4].classList.add("ganhou");
    quadrados[7].classList.add("ganhou");
  } else if (
    superiorDireita &&
    superiorDireita === meioDireita &&
    superiorDireita === inferiorDireita
  ) {
    atribuirVencedor(superiorDireita);
    quadrados[2].classList.add("ganhou");
    quadrados[5].classList.add("ganhou");
    quadrados[8].classList.add("ganhou");
  } else if (
    superiorDireita &&
    superiorMeio &&
    superiorEsquerda &&
    meioEsquerda &&
    meioMeio &&
    meioDireita &&
    inferiorEsquerda &&
    inferiorMeio &&
    inferiorDireita
  ) {
    jogoRodando = false;
    statusBox.innerHTML = "Empatou!";
  } else {
    vezDoX = !vezDoX;
    if (vezDoX) {
      statusBox.innerHTML = "Vez de X!";
    } else {
      statusBox.innerHTML = "Vez de O!";
    }
  }
};

const atribuirVencedor = function (letra) {
    jogoRodando = false; //encerra o jogo
    if (letra === 'X') {
      statusBox.innerHTML = gerarSimbolo(letra) + " venceu!";
    } else {
      statusBox.innerHTML = gerarSimbolo(letra) + " venceu!";
    }
  };


const permitirReiniciar = function () {
  vezDoX = true; //começa sempre pelo X
  statusBox.innerHTML = "Vez de X!";

  location.reload(); //reloada a página pra resetar tudo
};


const permitirClicar = function (c) {
//para permitir que o jogo continue, verifica se: 1-jogando é verdadeiro; 2-os espaços estão preenchidos.
  const classList = c.target.classList;

  //sem isso aqui, dá pra continuar jogando mesmo com vencedor:
  if (!jogoRodando || classList[1] === 'X' || classList[1] === 'O') {
    return; //return vazio interrompe a lógica
  }

  if (vezDoX) { //se é a vez do X, adiciona 'X' no espaço
    classList.add('X');
    verificacaoStatus(); //faz a verificação se está tudo preenchido
  } else { //se é a vez da O, adiciona 'O' no espaço
    classList.add('O');
    verificacaoStatus(); //faz a verificação se está tudo preenchido
  }
};

botaoReiniciar.addEventListener('click', permitirReiniciar); //espera o clique p executar função contida na variável permitirClicar

for (const quadrado of quadrados) { //percorre os espaços
  quadrado.addEventListener('click', permitirClicar); //executa a função contida em permitirClicar diante do clique
}
