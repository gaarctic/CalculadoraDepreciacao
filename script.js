// Array de bens do ativo imobilizado
const bensComuns = [
  "Máquina Industrial",
  "Veículo de Transporte",
  "Móveis e Utensílios",
  "Computadores e Equipamentos",
  "Imóvel Comercial",
];

// Calcular depreciação mensal
function calcularDepreciacao(precoCompra, vidaUtil) {
  return precoCompra / vidaUtil;
}

// Calcular o valor contábil
function calcularValorContabil(precoCompra, depreciacao, mesesUtilizados) {
  return Math.max(0, precoCompra - depreciacao * mesesUtilizados);
}

// Calcular se teve ganho ou perda de capital na venda desse bem
function calcularGanhoOuPerda(precoVenda, valorContabil) {
  return precoVenda - valorContabil;
}

// Função do Cálculo
function calcular() {
  const bemSelecionado = document.getElementById("bem").value;
  const precoCompra = parseFloat(document.getElementById("precoCompra").value);
  const vidaUtil = parseFloat(document.getElementById("vidaUtil").value);
  const mesesUtilizados = parseFloat(
    document.getElementById("mesesUtilizados").value
  );
  const precoVenda = parseFloat(document.getElementById("precoVenda").value);

  // Validação dos campos
  if (
    !bemSelecionado ||
    isNaN(precoCompra) ||
    isNaN(vidaUtil) ||
    isNaN(mesesUtilizados) ||
    isNaN(precoVenda)
  ) {
    alert("Por favor, preencha todos os campos corretamente.");
    return;
  }

  // Realizando o cálculo
  const depreciacao = calcularDepreciacao(precoCompra, vidaUtil);
  const valorContabil = calcularValorContabil(precoCompra, depreciacao, mesesUtilizados);
  const ganhoOuPerda = calcularGanhoOuPerda(precoVenda, valorContabil);

  // Criando um objeto com os dados inseridos e resultados
  const resultadoCalculado = {
    bem: bemSelecionado,
    precoCompra: precoCompra,
    vidaUtil: vidaUtil,
    mesesUtilizados: mesesUtilizados,
    precoVenda: precoVenda,
    depreciacao: depreciacao,
    valorContabil: valorContabil,
    ganhoOuPerda: ganhoOuPerda,
  };

  // Salvando o objeto no localStorage
  localStorage.setItem("resultadoCalculado", JSON.stringify(resultadoCalculado));

  // Preenchendo os resultados diretamente no HTML
  document.getElementById("depreciacao").textContent = depreciacao.toFixed(2);
  document.getElementById("valorContabil").textContent = valorContabil.toFixed(2);
  document.getElementById("ganhoOuPerda").textContent = ganhoOuPerda.toFixed(2);
  document.getElementById("resultadoFinal").textContent = ganhoOuPerda >= 0 ? "Ganho" : "Perda";

  // Exibindo os dados completos no console para depuração
  console.log("Dados armazenados no localStorage:", resultadoCalculado);
}

// Função para carregar dados salvos do localStorage
function carregarDados() {
  // Recuperando o dado armazenado no localStorage
  const dadosSalvos = localStorage.getItem("resultadoCalculado");

  // Verificando se existem dados salvos
  if (dadosSalvos) {
    const resultadoCalculado = JSON.parse(dadosSalvos);

    // Preenchendo os campos com os dados salvos
    document.getElementById("bem").value = resultadoCalculado.bem;
    document.getElementById("precoCompra").value = resultadoCalculado.precoCompra;
    document.getElementById("vidaUtil").value = resultadoCalculado.vidaUtil;
    document.getElementById("mesesUtilizados").value = resultadoCalculado.mesesUtilizados;
    document.getElementById("precoVenda").value = resultadoCalculado.precoVenda;

    // Preenchendo os resultados calculados no HTML
    document.getElementById("depreciacao").textContent = resultadoCalculado.depreciacao.toFixed(2);
    document.getElementById("valorContabil").textContent = resultadoCalculado.valorContabil.toFixed(2);
    document.getElementById("ganhoOuPerda").textContent = resultadoCalculado.ganhoOuPerda.toFixed(2);
    document.getElementById("resultadoFinal").textContent = resultadoCalculado.ganhoOuPerda >= 0 ? "Ganho" : "Perda";
  }
}

// Chamando a função para carregar dados ao carregar a página
window.onload = carregarDados;

// Função para limpar dados do localStorage
function limparDados() {
  // Remover o item específico do localStorage
  localStorage.removeItem("resultadoCalculado");

  // Limpar os campos da página
  document.getElementById("bem").value = "";
  document.getElementById("precoCompra").value = "";
  document.getElementById("vidaUtil").value = "";
  document.getElementById("mesesUtilizados").value = "";
  document.getElementById("precoVenda").value = "";

  // Limpar a exibição do resultado
  document.getElementById("depreciacao").textContent = "";
  document.getElementById("valorContabil").textContent = "";
  document.getElementById("ganhoOuPerda").textContent = "";
  document.getElementById("resultadoFinal").textContent = "";
}

// Adicionando um evento de clique no botão para limpar dados
document.getElementById("limparBtn").addEventListener("click", limparDados);
