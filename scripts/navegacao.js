const menu = document.querySelector("#menu");
const navegacao = document.querySelector("#navegacao");

menu.addEventListener("click", () => {
    navegacao.classList.toggle("aberto");

    const aberto = navegacao.classList.contains("aberto");
    menu.setAttribute("aria-expanded", aberto);
    menu.textContent = aberto ? "✕" : "☰";
});