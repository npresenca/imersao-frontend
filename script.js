const cardContainer = document.querySelector(".card-container");
const campoBusca = document.querySelector("#campo-busca");
let dados = [];

// Carrega os dados do JSON assim que a página é carregada
window.addEventListener('DOMContentLoaded', async () => {
    const resposta = await fetch("data.json");
    dados = await resposta.json();
    renderizarCards(dados);
});

async function iniciarBusca() {
    const termoBusca = campoBusca.value.toLowerCase();

    if (!dados.length) {
        console.error("Os dados ainda não foram carregados.");
        return;
    }

    const dadosFiltrados = dados.filter(dado => {
        return dado.nome.toLowerCase().includes(termoBusca) ||
               dado.descricao.toLowerCase().includes(termoBusca);
    });

    renderizarCards(dadosFiltrados);
}

function renderizarCards(dados) {
    cardContainer.innerHTML = ""; // Limpa os cards existentes antes de renderizar novos
    for (let dado of dados) {
        let article = document.createElement("article");
        article.innerHTML = `
            <h2>${dado.nome}</h2>
            <p><strong>Área:</strong> ${dado.area_conhecimento}</p>
            <p>${dado.descricao}</p>
            <a href="${dado.link}" target="_blank">Saiba Mais</a>
        `;
        cardContainer.appendChild(article);
    
    }
}
