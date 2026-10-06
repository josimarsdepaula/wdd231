import './comum.js';

const dados = new URLSearchParams(window.location.search);
const campos = [
  ['Nome', 'nome'], ['E-mail', 'email'], ['Tipo de projeto', 'tipo'], ['Descrição', 'mensagem']
];
const resumo = document.querySelector('#resumo');
if (campos.some(([, chave]) => !dados.get(chave)?.trim())) {
  resumo.append(Object.assign(document.createElement('p'), {textContent: 'Nenhum pedido completo foi recebido. Preencha o formulário para ver o resumo.'}));
} else {
  const lista = document.createElement('dl');
  campos.forEach(([rotulo, chave]) => {
    const termo = document.createElement('dt');
    const valor = document.createElement('dd');
    termo.textContent = rotulo;
    valor.textContent = dados.get(chave);
    lista.append(termo, valor);
  });
  resumo.append(lista);
}
