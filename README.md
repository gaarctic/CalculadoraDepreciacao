
# **Calculadora de Depreciação de Bens**

Este projeto implementa uma calculadora de depreciação de bens, permitindo o cálculo da depreciação, valor contábil, e ganho ou perda na venda de bens de acordo com seu preço de compra, vida útil, tempo utilizado e preço de venda. Os dados dos bens são carregados a partir de um arquivo JSON e a interface utiliza o gráfico do **Chart.js** para exibir os resultados.

## **Tecnologias Utilizadas**

- **HTML**: Estrutura da página e campos de entrada.
- **CSS**: Estilização e design da interface.
- **JavaScript**: Lógica de cálculo, manipulação de dados e interação com o usuário.
- **Chart.js**: Biblioteca para visualização dos resultados em gráficos.
- **LocalStorage**: Armazenamento dos resultados do cálculo para persistência entre as sessões.

## **Funcionalidades**

- **Cálculo de Depreciação**: O sistema calcula a depreciação do bem com base no preço de compra, vida útil e o número de meses utilizados.
- **Valor Contábil**: Calcula o valor contábil do bem considerando a depreciação.
- **Ganho ou Perda**: Determina o ganho ou a perda com a venda do bem, comparando o preço de venda com o valor contábil.
- **Exibição Gráfica**: Exibe os resultados em um gráfico de barras usando **Chart.js**.
- **Carregamento Dinâmico**: Os bens são carregados dinamicamente a partir de um arquivo JSON.
- **Armazenamento Local**: Os resultados são armazenados no **localStorage** e podem ser visualizados a qualquer momento.
- **Limpeza de Dados**: Possui um botão para limpar todos os campos, resultados e gráficos, além de apagar os dados do **localStorage**.

## **Como Usar**

1. Clone este repositório:
    ```bash
    git clone https://github.com/seu-usuario/calculadora-depreciacao.git
    ```

2. Navegue até o diretório do projeto:
    ```bash
    cd calculadora-depreciacao
    ```

3. Abra o arquivo `index.html` em seu navegador para utilizar a calculadora.

## **Estrutura de Arquivos**

- `index.html`: Contém a estrutura da página e as interações com o usuário.
- `style.css`: Arquivo de estilo para a interface.
- `script.js`: Lógica JavaScript que faz os cálculos, manipula dados e gera gráficos.
- `bens.json`: Arquivo JSON contendo os dados dos bens (nome, preço de compra, vida útil).

## **Como Funciona**

1. **Carregamento dos Bens**: Os bens disponíveis para depreciação são carregados a partir do arquivo JSON `bens.json`. Eles são exibidos em um dropdown para o usuário selecionar.
   
2. **Preenchimento dos Campos**: O usuário seleciona um bem e preenche os campos de preço de compra, vida útil, meses utilizados e preço de venda.

3. **Cálculo**: Ao clicar no botão "Calcular", os valores de depreciação, valor contábil e ganho/perda são calculados e exibidos na tela.

4. **Gráfico**: Um gráfico é gerado automaticamente com os resultados de depreciação, valor contábil e ganho ou perda, utilizando a biblioteca **Chart.js**.

5. **Limpeza de Dados**: O botão "Limpar" remove todos os dados preenchidos, limpa o gráfico e remove os dados armazenados no **localStorage**.

## **Exemplo de `bens.json`**

```json
[
    {
        "nome": "Máquina Industrial",
        "precoCompra": 50000,
        "vidaUtil": 10
    },
    {
        "nome": "Veículo de Transporte",
        "precoCompra": 20000,
        "vidaUtil": 8
    },
    {
        "nome": "Móveis e Utensílios",
        "precoCompra": 3000,
        "vidaUtil": 5
    },
    {
        "nome": "Computadores e Equipamentos",
        "precoCompra": 4000,
        "vidaUtil": 3
    },
    {
        "nome": "Imóvel Comercial",
        "precoCompra": 150000,
        "vidaUtil": 30
    }
]
```

## **Instruções de Funcionamento**

- **Seleção de Bem**: O usuário deve selecionar o bem de sua escolha no dropdown.
- **Campos de Cálculo**: Após selecionar o bem, os campos de preço de compra, vida útil, meses utilizados e preço de venda precisam ser preenchidos.
- **Erro de Entrada**: Se algum campo estiver vazio ou incorreto, será exibida uma mensagem de erro para o usuário.
- **Exibição de Resultados**: Após o cálculo, a depreciação, valor contábil e ganho/perda são exibidos na página e um gráfico de barras é gerado.

## **Exemplo de Resultados**

- **Depreciação**: O valor de depreciação calculado com base no preço de compra e vida útil do bem.
- **Valor Contábil**: O valor atual do bem após a depreciação.
- **Ganho/Perda**: O valor de ganho ou perda dependendo do preço de venda comparado ao valor contábil.

