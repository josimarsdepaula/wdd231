import './comum.js';

const lista = document.querySelector('#lista-solucoes');
const filtro = document.querySelector('#categoria');
const busca = document.querySelector('#busca');
const contagem = document.querySelector('#contagem');
const dialogo = document.querySelector('#detalhes');
const conteudo = document.querySelector('#conteudo-detalhes');
let solucoes = [];

try {
  const salva = localStorage.getItem('codecase-categoria');
  if (salva && [...filtro.options].some((opcao) => opcao.value === salva)) filtro.value = salva;
} catch (erro) {
  console.info('Preferência local indisponível.', erro);
}

function criarTexto(tag, texto, classe) {
  const elemento = document.createElement(tag);
  elemento.textContent = texto;
  if (classe) elemento.className = classe;
  return elemento;
}

function mostrarDetalhes(item) {
  conteudo.replaceChildren(
    criarTexto('p', item.categoria, 'etiqueta'),
    criarTexto('h2', item.nome),
    criarTexto('p', item.descricao),
    criarTexto('p', `Indicado para: ${item.publico}`),
    criarTexto('p', `Benefício: ${item.beneficio}`)
  );
  dialogo.showModal();
}

function renderizar() {
  const termo = busca.value.trim().toLocaleLowerCase('pt-BR');
  const filtradas = solucoes.filter((item) =>
    (filtro.value === 'Todas' || item.categoria === filtro.value) &&
    `${item.nome} ${item.publico} ${item.beneficio} ${item.descricao}`.toLocaleLowerCase('pt-BR').includes(termo)
  );
  const cartoes = filtradas.map((item) => {
    const artigo = document.createElement('article');
    artigo.className = 'cartao';
    artigo.append(
      criarTexto('p', item.categoria, 'etiqueta'),
      criarTexto('h3', item.nome),
      criarTexto('p', `Para: ${item.publico}`),
      criarTexto('p', `Benefício: ${item.beneficio}`)
    );
    const botao = criarTexto('button', 'Ver detalhes', 'link-botao');
    botao.type = 'button';
    botao.addEventListener('click', () => mostrarDetalhes(item));
    artigo.append(botao);
    return artigo;
  });
  lista.replaceChildren(...cartoes);
  contagem.textContent = `${filtradas.length} ${filtradas.length === 1 ? 'solução encontrada' : 'soluções encontradas'}.`;
  if (!filtradas.length) lista.append(criarTexto('p', 'Nenhuma solução corresponde à busca. Experimente outro termo.'));
}

async function carregarSolucoes() {
  try {
    const resposta = await fetch('dados/solucoes.json');
    if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
    const dados = await resposta.json();
    if (!Array.isArray(dados)) throw new Error('Formato de dados inválido.');
    solucoes = dados;
    renderizar();
  } catch (erro) {
    console.error('Falha ao carregar soluções:', erro);
    contagem.textContent = 'Não foi possível carregar o catálogo.';
    lista.replaceChildren(criarTexto('p', 'Tente atualizar a página. Se abriu o arquivo diretamente, acesse o site por um servidor web.'));
  }
}

filtro.addEventListener('change', () => {
  try { localStorage.setItem('codecase-categoria', filtro.value); } catch (erro) { console.info('Preferência local indisponível.', erro); }
  renderizar();
});
busca.addEventListener('input', renderizar);
document.querySelector('#fechar-detalhes').addEventListener('click', () => dialogo.close());
dialogo.addEventListener('click', (evento) => { if (evento.target === dialogo) dialogo.close(); });
carregarSolucoes();
