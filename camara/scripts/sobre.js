import { locais } from "../data/locais.mjs";

const galeria = document.querySelector("#galeria-sobre");
const creditos = document.querySelector("#lista-creditos");

for (const [indice, local] of locais.entries()) {
    const cartao = document.createElement("article");
    cartao.className = `cartao-sobre area-${indice + 1}`;

    const titulo = document.createElement("h2");
    titulo.textContent = local.nome;

    const figura = document.createElement("figure");
    const imagem = document.createElement("img");
    imagem.src = local.imagem;
    imagem.alt = `Vista de ${local.nome}, em Curitiba`;
    imagem.width = 300;
    imagem.height = 200;
    imagem.loading = "lazy";
    figura.append(imagem);

    const endereco = document.createElement("address");
    endereco.textContent = local.endereco;

    const descricao = document.createElement("p");
    descricao.textContent = local.descricao;

    const botao = document.createElement("button");
    botao.type = "button";
    botao.textContent = "Saiba mais";
    botao.setAttribute("aria-expanded", "false");
    botao.setAttribute("aria-controls", `detalhe-${local.id}`);

    const detalhe = document.createElement("div");
    detalhe.id = `detalhe-${local.id}`;
    detalhe.hidden = true;
    const texto = document.createElement("p");
    texto.textContent = local.detalhe;
    const fonte = document.createElement("a");
    fonte.href = local.fonte;
    fonte.textContent = "Informações oficiais de turismo";
    detalhe.append(texto, fonte);

    botao.addEventListener("click", () => {
        const abrir = detalhe.hidden;
        detalhe.hidden = !abrir;
        botao.setAttribute("aria-expanded", String(abrir));
        botao.textContent = abrir ? "Mostrar menos" : "Saiba mais";
    });

    cartao.append(titulo, figura, endereco, descricao, botao, detalhe);
    galeria.append(cartao);

    const credito = document.createElement("li");
    const link = document.createElement("a");
    link.href = local.imagemFonte;
    link.textContent = local.nome;
    credito.append(link, ` — ${local.credito} (${local.licenca})`);
    if (local.licencaUrl) {
        const licenca = document.createElement("a");
        licenca.href = local.licencaUrl;
        licenca.textContent = "Licença";
        credito.append(" · ", licenca);
    }
    creditos.append(credito);
}

const mensagem = document.querySelector("#mensagem-visita");
const chave = "camara-curitiba-ultima-visita-sobre";
const agora = Date.now();
try {
    const anterior = Number(localStorage.getItem(chave));
    if (!anterior || anterior > agora) {
        mensagem.textContent = "Boas-vindas! Entre em contato conosco caso tenha alguma dúvida.";
    } else {
        const dias = Math.floor((agora - anterior) / 86400000);
        mensagem.textContent = dias < 1
            ? "Já voltou? Que legal!"
            : `Seu último acesso foi há ${dias} ${dias === 1 ? "dia" : "dias"}.`;
    }
    localStorage.setItem(chave, String(agora));
} catch {
    mensagem.textContent = "Boas-vindas! Entre em contato conosco caso tenha alguma dúvida.";
}
