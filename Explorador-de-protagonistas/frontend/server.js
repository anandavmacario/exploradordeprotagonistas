/*
=====================================
  FRONT-END — consome nossa API local
=====================================

Este arquivo roda no navegador.
Ele faz requisições para nossa API Node.js
e mostra os dados na tela.
*/

//=======================
//ELEMENTOS DO HTML
//=======================
//foto do cachorro
const dogImage = document.getElementById("protagonistaImage");
//nome raça
const breedName = document.getElementById("protagonistaName");
//cachorro aleatório
const randomBtn = document.getElementById("randomBtn");
//botão que busca cachorro por raça
const searchBtn = document.getElementById("searchBtn");
//campo de texto onde o usuário digita a raça
const breedInput = document.getElementById("protagonistaInput");
//area onde fica a imagem do cachorro
//usamos querySelector porque é uma classe(.dog-area)
const dogArea = document.querySelector(".dog-area");

//==============================
// URL DA API
//==============================

const API = "http://localhost:3000/api/protagonista";

//==============================
// FUNÇÃO PRINCIPAL
//==============================

async function buscarprotagonista(url){
  // adiciona a classe "loading"
  // normalmente usada para mostrar animação de carregamento
  dogArea.classList.add("loading");

  try {
    //faz requisição HTTP para a API
    const response = await fetch(url);
    // converte a resposta para JSON
    const data = await response.json();
    //mostra no console a resposta da API
    console.log("Resposta da API:", data)

    //Vamos verificar se a API retornou erro
    if (data.status === "error"){
      //mostra a mensagem de erro na tela
      //breedName - Elemento HTML
      //.textContent - Propriedade que define o texto do elemento
      //data - Objeto com os dados recebidos da API
      //.message - Propriedade que contém a mensagem ou URL
      breedName.textContent = data.message;
      //remove a imagem
      dogImage.src = "";
      //execução da função
      return;
    }

    //coloca a imagem do cachorro na tela 
    // o src define qual imagem será exibida
    dogImage.src = data.message;

    // extrai o nome da raça da URL da imagem
    // exemplo da URL:
    // http://localhost:3000/fotos/husky/1.jpg

    //separa a URL em partes usando "/"
    const partes = data.message.split("/")

    //pega a posição 5 do array
    // que corresponde ao nome da raça
    const raca = partes[5]

    //coloca a primeira letra maiúscula
    // ex: husky --> Husky
    breedName.textContent = 
      //raca.charAt(0) - pega a primeira letra
      //.toUpperCase() - Transforma em maiúscula
      //raca.slice(1) - pega o texto a partir da segunda letra
      raca.charAt(0).toUpperCase() + raca.slice(1);

  } catch (erro){
    //caso o servidor esteja desligado
    //ou aconteça algum erro na requisição

    console.error(erro);
    
    //mostra mensagem na tela
    breedName.textContent = 
      "📴 servidor offline - rode: node server.js"
    
    //remove a imagem
    protagonistaImage.src = "";
  } finally {
    //remove a classe de carregamento
    //independentemente de erro ou sucesso.
    protagonista.classList.remove("loading")
  }
}

// ==============================
// AÇÕES
// ==============================

//função que busca o cachorro aleatório
function cachorroAleatorio(){
  //chamar a função principal
  //passando a rota /aleatorio da API
  buscarCachorro(`${API}/aleatorio`);
}

//função que busca cachorro por raça
function buscarPorPersonagem(){
  //pegar o texto digitado input
  //Trim ele remove os espaços em branco {trim()} do inicio e do fim do texto.
  const raca = breedInput.value.trim().toLowerCase();

  //verificar se o usuário digitou algo
  if (!raca) {
    // se não digitou, mostra alerta
    alert ("Digite um personagem!")
    // interrompe a função
    return;
  }

  //chamar a API passando a raca na URL
  //exemplo: /api/cachorros/husky
  buscarprotagonista(`${API}/${raca}`)
}

// ====================================
// EVENTOS
// ====================================

// quando clicar no botão "aleatório"
randomBtn.addEventListener("click", cachorroAleatorio);

// quando clicar no botão "buscar"
searchBtn.addEventListener("click", buscarPorRaca);

//quando clicar na imagem do cachorro
//carrega outro cachorro aleatório
dogImage.addEventListener("click", cachorroAleatorio);

//quando o usuário apertar o ENTER no input
breedInput.addEventListener("keypress", (event) =>{
  //verifica se a tecla pressionada foi enter
  if (event.key === "Enter"){
    //executa a busca por raça
    buscarPorRaca();
  }
})

//CARREGA AO ABRIR A PÁGINA

cachorroAleatorio();