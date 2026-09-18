const menu = document.querySelector("#menu");
const navegacao = document.querySelector("#navegacao");
const membros = document.querySelector("#membros");
const grade = document.querySelector("#grade");
const lista = document.querySelector("#lista");

const anoAtual = document.querySelector("#anoAtual");
const ultimaModificacao = document.querySelector("#ultimaModificacao");


menu.addEventListener("click", () => {
    navegacao.classList.toggle("aberto");

    const aberto = navegacao.classList.contains("aberto");

    menu.setAttribute("aria-expanded", aberto);
    menu.textContent = aberto ? "✕" : "☰";
});


async function carregarMembros() {

    try {
        const resposta = await fetch("dados/membros.json");
        const dados = await resposta.json();

        exibirMembros(dados);

    } catch (erro) {
        membros.innerHTML = "<p>Não foi possível carregar os membros.</p>";
        console.error("Erro ao carregar os membros:", erro);
    }
}


function exibirMembros(listaMembros) {

    membros.innerHTML = "";

    listaMembros.forEach((membro) => {

        const cartao = document.createElement("article");

        cartao.classList.add("membro");

        let textoNivel = "";

        if (membro.nivel === 3) {
            textoNivel = "Membro Ouro";
        } else if (membro.nivel === 2) {
            textoNivel = "Membro Prata";
        } else {
            textoNivel = "Membro";
        }

        cartao.innerHTML = `
            <img src="imagens/${membro.imagem}" alt="${membro.nome}" loading="lazy">

            <h2>${membro.nome}</h2>

            <p>${membro.descricao}</p>

            <p><strong>Endereço:</strong> ${membro.endereco}</p>

            <p><strong>Telefone:</strong> ${membro.telefone}</p>

            <a href="${membro.site}" target="_blank" rel="noopener noreferrer">
                Visitar site
            </a>

            <span class="nivel">${textoNivel}</span>
        `;

        membros.appendChild(cartao);
    });
}


grade.addEventListener("click", () => {

    membros.classList.remove("lista");
    membros.classList.add("grade");

    grade.classList.add("ativo-controle");
    lista.classList.remove("ativo-controle");
});


lista.addEventListener("click", () => {

    membros.classList.remove("grade");
    membros.classList.add("lista");

    lista.classList.add("ativo-controle");
    grade.classList.remove("ativo-controle");
});


anoAtual.textContent = new Date().getFullYear();

ultimaModificacao.textContent =
    `Última modificação: ${document.lastModified}`;


carregarMembros();