// FRONT-END - consome nossa API local
// Este arquivo roda no navegador.
// Ele faz requisições na nossa API Node.js e mostra os dados na tela.
//=======================
//ELEMENTOS DO HTML
//=======================
//foto do cachorro
const protagonistaImage = document.getElementById("protagonistaImage");
//nome raça
const personagemName = document.getElementById("protagonistaName");
//cachorro aleatório
const randomBtn = document.getElementById("randomBtn");
//botão que busca cachorro por raça
const searchBtn = document.getElementById("searchBtn");
//campo de texto onde o usuário digita a raça
const personagemInput = document.getElementById("protagonistaInput");
//area onde fica a imagem do cachorro
//usamos querySelector porque é uma classe(.dog-area)
const protagonistaArea = document.querySelector(".protagonista-area");
//==============================
// URL DA API
//==============================
const API = "http://localhost:3000/api/protagonistas";
//
// FUNÇÃO PRINCIPAL
//
async function buscarPersonagem(url){
  // adiciona a classe "loading"
  // normalmente usada para mostrar animação de carregamento
  protagonistaArea.classList.add("loading");
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
      personagemName.textContent = data.message;
      //remove a imagem
      protagonistaImage.src = "";
      //execução da função
      return;
    }
    //coloca a imagem do cachorro na tela 
    // o src define qual imagem será exibida
    protagonistaImage.src = data.message;
    // extrai o nome da raça da URL da imagem
    // exemplo da URL:
    // http://localhost:3000/fotos/husky/1.jpg
    //separa a URL em partes usando "/"
    const partes = data.message.split("/")
    //pega a posição 5 do array
    // que corresponde ao nome da raça
    const personagem = partes[5]
    //coloca a primeira letra maiúscula
    // ex: husky --> Husky
    personagemName.textContent = 
      //raca.charAt(0) - pega a primeira letra
      //.toUpperCase() - Transforma em maiúscula
      //raca.slice(1) - pega o texto a partir da segunda letra
      personagem.charAt(0).toUpperCase() + personagem.slice(1);
  } catch (erro){
    //caso o servidor esteja desligado
    //ou aconteça algum erro na requisição
    console.error(erro);
    
    //mostra mensagem na tela
    personagemName.textContent = 
      "📴 servidor offline - rode: node server.js"
    
    //remove a imagem
    protagonistaImage.src = "";
  } finally {
    //remove a classe de carregamento
    //independentemente de erro ou sucesso.
    protagonistaArea.classList.remove("loading")
  }
}
//
//AÇÕES
//
//Função que buscao cachorro aleatório
function protagonistaAleatorio(){
    //chamar a função principal
    //passando a rota/aleatório da API
    buscarProtagonista('${API}/aleatorio');
}
//Função que busca cahorro por raça
function buscarPorPersonagem(){
    //pegar o texto digitado po input
    //Trim ele remove os espaços em branco {trim()} do início e do fim do texto
    const personagem = personagemInput.value.trim().toLowerCase();
    //verificar se o usuário digitou algo
    if (!personagem) {
        //se não digitou mostra alerta
        alert ("Digite um personagem!")
        return;
    }
    //chamar a API passndoa raca na URL
    //exemplo: /api/cachorros/husky
    buscarProtagonista('${API}/${personagem}')
}
//
//EVENTOS
//
//quando clicar no botão "aleatório"
randomBtn.addEventListener("click", protagonistaAleatorio);
//quando clicar no botão "buscar"
searchBtn.addEventListener("click", buscarPorPersonagem);
//quando clicar naa imagem do cachorro
//carrega outro cachorro aleatório
protagonistaImage.addEventListener("click", protagonistaAleatorio);
//quandoo usuário apertar o ENTER no input
personagemInput.addEventListener("keypress", (event) =>{
    //verifica se a tecla pressionada foi enter
    if (event.key ==="Enter"){
        //executa a busca por raça
        buscarPorPersonagem();
    }
});