const botao = document.querySelector('#menu');
const navegacao = document.querySelector('#navegacao');

botao?.addEventListener('click', () => {
  const aberto = botao.getAttribute('aria-expanded') === 'true';
  botao.setAttribute('aria-expanded', String(!aberto));
  botao.setAttribute('aria-label', aberto ? 'Abrir menu' : 'Fechar menu');
  navegacao.classList.toggle('aberta', !aberto);
});

document.querySelector('#ano').textContent = new Date().getFullYear();

// O link será preenchido quando o vídeo exigido pelo curso estiver publicado.
const video = document.querySelector('#video');
if (video) {
  video.addEventListener('click', (evento) => {
    if (video.getAttribute('href') === '#video-pendente') {
      evento.preventDefault();
      window.alert('O vídeo de demonstração ainda será publicado pelo autor.');
    }
  });
}
