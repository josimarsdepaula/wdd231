const parametros = new URLSearchParams(window.location.search);
const campos = ["nome", "sobrenome", "email", "telefone", "organizacao"];

campos.forEach((campo) => {
    document.getElementById(`resumo-${campo}`).textContent = parametros.get(campo) || "Não informado";
});

const registro = parametros.get("timestamp");
const data = registro ? new Date(registro) : null;
document.getElementById("resumo-timestamp").textContent = data && !Number.isNaN(data.getTime())
    ? new Intl.DateTimeFormat("pt-BR", { dateStyle: "long", timeStyle: "medium" }).format(data)
    : "Não informado";

if (!campos.every((campo) => parametros.get(campo)?.trim()) || !data || Number.isNaN(data.getTime())) {
    document.getElementById("mensagem-confirmacao").textContent =
        "Nenhuma solicitação completa foi encontrada. Preencha o formulário de associação para conferir seus dados aqui.";
}
