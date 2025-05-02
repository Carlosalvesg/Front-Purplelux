// Exibe no console para garantir que o JS foi carregado corretamente
console.log("JS carregado com sucesso!");

// Seleciona o elemento que contém todos os banners
const banners = document.querySelector(".banners");
// Seleciona todos os indicadores (as bolinhas ou pontos abaixo do banner)
const indicators = document.querySelectorAll(".logo-indicator");

// Inicializa o índice do banner atual (começa no primeiro banner)
let currentIndex = 0;
// Variável para armazenar o intervalo da rotação automática
let interval;
// Flag para garantir que a transição não aconteça várias vezes ao mesmo tempo
let isTransitioning = false;

// Função para atualizar o banner com base no índice
function updateBanner(index) {
  // Verifica se já está em transição, e se estiver, não faz nada
  if (isTransitioning) return; // Previne que a transição aconteça enquanto outra estiver em andamento
  isTransitioning = true; // Marca que a transição está acontecendo

  // Atualiza o índice atual
  currentIndex = index;

  // Aplica a transformação de transição de forma explícita (a cada 0.6 segundos)
  banners.style.transition = "transform 0.6s ease-in-out";
  // Move os banners para a posição do índice atual, fazendo o carrossel deslizar
  banners.style.transform = `translateX(-${currentIndex * 100}%)`;

  // Atualiza os indicadores (as bolinhas) para mostrar qual banner está ativo
  indicators.forEach((logo, i) => {
    logo.classList.toggle("active", i === currentIndex); // Adiciona/remover a classe 'active' conforme o índice
  });
}

// Função para iniciar a rotação automática dos banners
function startAutoRotation() {
  interval = setInterval(() => {
    // A cada 5 segundos, aumenta o índice e move para o próximo banner
    currentIndex = (currentIndex + 1) % indicators.length; // Faz o índice voltar ao 0 quando chega no último
    updateBanner(currentIndex); // Atualiza o banner com o novo índice
  }, 5000); // Intervalo de 5 segundos para cada rotação
}

// Função para parar a rotação automática (usada quando o usuário clica nos indicadores)
function stopAutoRotation() {
  clearInterval(interval); // Limpa o intervalo da rotação automática
}

// Inicia a rotação automática assim que a página carrega
startAutoRotation();

// Controla a navegação manual, clicando nos indicadores
indicators.forEach((logo, i) => {
  logo.addEventListener("click", () => {
    currentIndex = i; // Atualiza o índice para o banner correspondente ao indicador clicado
    updateBanner(currentIndex); // Atualiza o banner manualmente
    stopAutoRotation(); // Para a rotação automática
    startAutoRotation(); // Reinicia a rotação automática para continuar após o clique
  });
});

// Garante que o carrossel não pule para o primeiro banner sem transição
banners.addEventListener("transitionend", () => {
  // Verifica se chegamos no último banner
  if (currentIndex === indicators.length) {
    currentIndex = 0; // Se sim, volta para o primeiro banner
    banners.style.transition = "none"; // Remove a transição para que não haja "pulo"
    banners.style.transform = `translateX(-${currentIndex * 100}%)`; // Posiciona no primeiro banner sem transição

    setTimeout(() => {
      banners.style.transition = "transform 0.6s ease-in-out"; // Restaura a transição depois de um pequeno delay
      isTransitioning = false; // Permite a transição novamente
    }, 20); // Delay de 20 milissegundos para que a transição seja restaurada corretamente
  } else {
    isTransitioning = false; // Se não for o último banner, simplesmente permite que a transição continue
  }
});
