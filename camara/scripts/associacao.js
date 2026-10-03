document.querySelector("#timestamp").value = new Date().toISOString();

document.querySelectorAll("[data-modal]").forEach((botao) => {
    const modal = document.getElementById(botao.dataset.modal);
    botao.setAttribute("aria-haspopup", "dialog");
    botao.setAttribute("aria-controls", modal.id);
    botao.addEventListener("click", () => modal.showModal());
    modal.querySelector(".fechar-modal").addEventListener("click", () => modal.close());
});
