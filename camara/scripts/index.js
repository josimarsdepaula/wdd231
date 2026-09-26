const menu = document.querySelector("#menu");
const navegacao = document.querySelector("#navegacao");
const anoAtual = document.querySelector("#anoAtual");
const ultimaModificacao = document.querySelector("#ultimaModificacao");

const empresasDestaque = document.querySelector("#empresas-destaque");

const climaAtual = document.querySelector("#clima-atual");
const previsao = document.querySelector("#previsao");

const apiKey = "72ae148c637f54b810075a0cc3b38202";
const cidade = "Curitiba";
const codigoPais = "BR";

// Menu responsivo
menu.addEventListener("click", () => {
    navegacao.classList.toggle("aberto");

    const aberto = navegacao.classList.contains("aberto");

    menu.setAttribute("aria-expanded", aberto);
    menu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    menu.textContent = aberto ? "✕" : "☰";
});

// Rodapé
anoAtual.textContent = new Date().getFullYear();

ultimaModificacao.textContent =
    `Última modificação: ${document.lastModified}`;


// EMPRESAS EM DESTAQUE

async function carregarDestaques() {
    try {
        const resposta = await fetch("dados/membros.json");

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar os membros.");
        }

        const membros = await resposta.json();

        // Somente membros Prata (2) e Ouro (3)
        const membrosQualificados = membros.filter(
            (membro) => membro.nivel === 2 || membro.nivel === 3
        );

        // Embaralha os membros
        for (let i = membrosQualificados.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [membrosQualificados[i], membrosQualificados[j]] =
                [membrosQualificados[j], membrosQualificados[i]];
        }

        // Seleciona 3 empresas
        const selecionados = membrosQualificados.slice(0, 3);

        exibirDestaques(selecionados);

    } catch (erro) {
        console.error("Erro ao carregar destaques:", erro);

        empresasDestaque.innerHTML =
            "<p>Não foi possível carregar as empresas em destaque.</p>";
    }
}


function exibirDestaques(membros) {
    empresasDestaque.innerHTML = "";

    membros.forEach((membro) => {

        const cartao = document.createElement("article");

        cartao.classList.add("empresa-destaque");

        const nivel =
            membro.nivel === 3 ? "Ouro" : "Prata";

        cartao.innerHTML = `
            <img
                src="imagens/${membro.imagem}"
                alt="Logotipo da empresa ${membro.nome}"
                loading="lazy">

            <h3>${membro.nome}</h3>

            <p>
                <strong>Endereço:</strong>
                ${membro.endereco}
            </p>

            <p>
                <strong>Telefone:</strong>
                ${membro.telefone}
            </p>

            <p>
                <strong>Nível:</strong>
                ${nivel}
            </p>

            <a
                href="${membro.site}"
                target="_blank"
                rel="noopener noreferrer">
                Visitar site
            </a>
        `;

        empresasDestaque.appendChild(cartao);
    });
}


carregarDestaques();
async function carregarClima() {
    try {
        const urlAtual =
            `https://api.openweathermap.org/data/2.5/weather?q=${cidade},${codigoPais}&units=metric&lang=pt_br&appid=${apiKey}`;

        const respostaAtual = await fetch(urlAtual);

        if (!respostaAtual.ok) {
            throw new Error("Não foi possível carregar o clima atual.");
        }

        const dadosAtual = await respostaAtual.json();

        climaAtual.innerHTML = `
            <h3>Hoje</h3>
            <p>
                <strong>Temperatura:</strong>
                ${Math.round(dadosAtual.main.temp)} °C
            </p>
            <p>
                <strong>Condição:</strong>
                ${dadosAtual.weather[0].description}
            </p>
        `;

        carregarPrevisao();

    } catch (erro) {
        console.error("Erro ao carregar o clima:", erro);

        climaAtual.innerHTML =
            "<p>Não foi possível carregar as informações do clima.</p>";
    }
}


async function carregarPrevisao() {
    try {
        const urlPrevisao =
            `https://api.openweathermap.org/data/2.5/forecast?q=${cidade},${codigoPais}&units=metric&lang=pt_br&appid=${apiKey}`;

        const resposta = await fetch(urlPrevisao);

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar a previsão.");
        }

        const dados = await resposta.json();

        // A API fornece dados a cada 3 horas.
        // Vamos utilizar aproximadamente o horário das 12h.
        const previsoes = dados.list.filter((item) =>
            item.dt_txt.includes("12:00:00")
        );

        previsao.innerHTML = "";

        previsoes.slice(0, 3).forEach((dia) => {

            const data = new Date(dia.dt * 1000);

            const dataFormatada = data.toLocaleDateString(
                "pt-BR",
                {
                    weekday: "long",
                    day: "2-digit",
                    month: "2-digit"
                }
            );

            const cartao = document.createElement("div");

            cartao.classList.add("dia-previsao");

            cartao.innerHTML = `
                <h3>${dataFormatada}</h3>
                <p>${Math.round(dia.main.temp)} °C</p>
                <p>${dia.weather[0].description}</p>
            `;

            previsao.appendChild(cartao);
        });

    } catch (erro) {
        console.error("Erro ao carregar previsão:", erro);

        previsao.innerHTML =
            "<p>Não foi possível carregar a previsão.</p>";
    }
}


carregarClima();
