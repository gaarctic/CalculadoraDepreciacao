let bens = [];

function carregarBens() {
    fetch('json/bens.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar o arquivo JSON');
            }
            return response.json();
        })
        .then(data => {
            bens = data; 

            const select = document.getElementById("bem");
            const bemError = document.getElementById('bemError');
            bemError.textContent = ''; 
            select.innerHTML = '';

            if (bens.length === 0) {
                bemError.textContent = 'Nenhum bem disponível para selecionar.';
                bemError.classList.add('visible');
                return;
            }
            bens.forEach(bem => {
                const option = document.createElement("option");
                option.value = bem.nome;
                option.textContent = bem.nome;
                select.appendChild(option);
            });
            select.addEventListener('change', preencherCampos);
        })
        .catch(error => {
            console.error('Erro ao carregar o arquivo JSON:', error);
            const bemError = document.getElementById('bemError');
            bemError.textContent = 'Erro ao carregar os dados. Por favor, tente novamente.';
            bemError.classList.add('visible');
        });
}

function preencherCampos() {
    const bemSelecionado = document.getElementById("bem").value;
    const bemSelecionadoObj = bens.find(bem => bem.nome === bemSelecionado);

    if (bemSelecionadoObj) {
        document.getElementById("precoCompra").value = bemSelecionadoObj.precoCompra || '';
        document.getElementById("vidaUtil").value = bemSelecionadoObj.vidaUtil || '';
    } else {
        document.getElementById("precoCompra").value = '';
        document.getElementById("vidaUtil").value = '';
    }
}

document.addEventListener("DOMContentLoaded", function() {
    carregarBens(); 
});

let grafico = null;  
function calcular() {
    limparErros(); 

    const bemSelecionado = document.getElementById("bem").value;
    const bemSelecionadoObj = bens.find(bem => bem.nome === bemSelecionado);

    if (!bemSelecionadoObj) {
        document.getElementById("bemError").textContent = "Por favor, selecione um bem válido.";
        document.getElementById("bemError").classList.add('visible');
        return;
    }

    const precoCompra = parseFloat(document.getElementById("precoCompra").value);
    const vidaUtil = parseFloat(document.getElementById("vidaUtil").value);
    const mesesUtilizados = parseFloat(document.getElementById("mesesUtilizados").value);
    const precoVenda = parseFloat(document.getElementById("precoVenda").value);

    
    if (isNaN(precoCompra) || isNaN(vidaUtil) || isNaN(mesesUtilizados) || isNaN(precoVenda)) {
        if (isNaN(precoCompra)) {
            document.getElementById("precoCompraError").textContent = "Por favor, insira um preço de compra válido.";
            document.getElementById("precoCompraError").classList.add('visible');
        }
        if (isNaN(vidaUtil)) {
            document.getElementById("vidaUtilError").textContent = "Por favor, insira uma vida útil válida.";
            document.getElementById("vidaUtilError").classList.add('visible');
        }
        if (isNaN(mesesUtilizados)) {
            document.getElementById("mesesUtilizadosError").textContent = "Por favor, insira o número de meses utilizados.";
            document.getElementById("mesesUtilizadosError").classList.add('visible');
        }
        if (isNaN(precoVenda)) {
            document.getElementById("precoVendaError").textContent = "Por favor, insira um preço de venda válido.";
            document.getElementById("precoVendaError").classList.add('visible');
        }
        return;
    }

    const depreciacao = calcularDepreciacao(precoCompra, vidaUtil);
    const valorContabil = calcularValorContabil(precoCompra, depreciacao, mesesUtilizados);
    const ganhoOuPerda = calcularGanhoOuPerda(precoVenda, valorContabil);

    const resultadoCalculado = {
        bem: bemSelecionadoObj.nome,
        precoCompra: precoCompra,
        vidaUtil: vidaUtil,
        mesesUtilizados: mesesUtilizados,
        precoVenda: precoVenda,
        depreciacao: depreciacao,
        valorContabil: valorContabil,
        ganhoOuPerda: ganhoOuPerda,
    };

    localStorage.setItem("resultadoCalculado", JSON.stringify(resultadoCalculado));

    document.getElementById("depreciacao").textContent = depreciacao.toFixed(2);
    document.getElementById("valorContabil").textContent = valorContabil.toFixed(2);
    document.getElementById("ganhoOuPerda").textContent = ganhoOuPerda.toFixed(2);
    document.getElementById("resultadoFinal").textContent = ganhoOuPerda >= 0 ? "Ganho" : "Perda";
    gerarGrafico(depreciacao, valorContabil, ganhoOuPerda);
}

function calcularDepreciacao(precoCompra, vidaUtil) {
    return precoCompra / vidaUtil;  
}

function calcularValorContabil(precoCompra, depreciacao, mesesUtilizados) {
    return precoCompra - (depreciacao * mesesUtilizados); 
}

function calcularGanhoOuPerda(precoVenda, valorContabil) {
    return precoVenda - valorContabil;  
}

function limparErros() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => element.classList.remove('visible'));
}

function gerarGrafico(depreciacao, valorContabil, ganhoOuPerda) {
    const ctx = document.getElementById('grafico').getContext('2d');

    if (grafico) {
        grafico.destroy();
    }

    grafico = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Depreciação', 'Valor Contábil', 'Ganho/Perda'],
            datasets: [{
                label: 'Valores',
                data: [depreciacao, valorContabil, ganhoOuPerda],
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(75, 192, 192, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function limparDados() {
    localStorage.removeItem("resultadoCalculado");
    document.getElementById("depreciacao").textContent = '';
    document.getElementById("valorContabil").textContent = '';
    document.getElementById("ganhoOuPerda").textContent = '';
    document.getElementById("resultadoFinal").textContent = '';

}
