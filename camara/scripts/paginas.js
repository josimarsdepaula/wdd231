const menu = document.querySelector("#menu");
const navegacao = document.querySelector("#navegacao");

menu.addEventListener("click", () => {
    const aberto = navegacao.classList.toggle("aberto");
    menu.setAttribute("aria-expanded", aberto);
    menu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    menu.textContent = aberto ? "✕" : "☰";
});

document.querySelector("#anoAtual").textContent = new Date().getFullYear();
document.querySelector("#ultimaModificacao").textContent =
    `Última modificação: ${document.lastModified}`;
