"use strict";

const ASSET_VERSION = document.querySelector('meta[name="asset-version"]')?.content || "20261005-cache-1";

// Altere o telefone e a mensagem de contato somente aqui.
const CONTACT = {
  phone: "5531989736847",
  message: "Olá, Gustavo! Vi seu portfólio e gostaria de conversar sobre um trabalho.",
};

const featuredVideos = [
  {
    "id": "vTOH8dpboH0",
    "p": "youtube",
    "o": "horizontal",
    "tag": "Case de Sucesso",
    "title": "Cineart - Meet Tecnologia"
  },
  {
    "id": "kRV6xSHG__w",
    "p": "youtube",
    "o": "vertical",
    "tag": "Minidocumentário",
    "title": "Projeto Aula de Violino"
  },
  {
    "id": "1233098511",
    "p": "vimeo",
    "o": "vertical",
    "tag": "Minidocumentário",
    "title": "Seminário Rota Ius Edição Mineração"
  },
  {
    "id": "4gZioQSLWYg",
    "p": "youtube",
    "o": "vertical",
    "tag": "Minidocumentário",
    "title": "Aniversário do Barreiro Minas Canta Vander Lee"
  },
  {
    "id": "DdQKJTqSlWo",
    "p": "youtube",
    "o": "vertical",
    "tag": "Campanha Publicitária",
    "title": "Confiber · Cacau Show"
  },
  {
    "id": "lcJuCTrI0wg",
    "p": "youtube",
    "o": "horizontal",
    "tag": "Case de Sucesso",
    "title": "Grupo Avante · Meet Tecnologia"
  },
  {
    "id": "llH5GXp3xow",
    "p": "youtube",
    "o": "vertical",
    "tag": "Campanha Publicitária",
    "title": "Confiber - Loja do Galo"
  },
  {
    "id": "1233104545",
    "p": "vimeo",
    "o": "vertical",
    "tag": "Campanha Publicitária",
    "title": "Mês das Mães"
  },
  {
    "id": "1233098510",
    "p": "vimeo",
    "o": "vertical",
    "tag": "Minidocumentário",
    "title": "Festival Nacional da Música Sertaneja Mangalarga Marchador"
  },
  {
    "id": "TZOEGnF5968",
    "p": "youtube",
    "o": "vertical",
    "tag": "Campanha Publicitária",
    "title": "Betim Futebol"
  },
  {
    "id": "DDvoJgs78XA",
    "p": "youtube",
    "o": "horizontal",
    "tag": "Case de Sucesso",
    "title": "Biologistica · Meet Tecnologia"
  },
  {
    "id": "1233098512",
    "p": "vimeo",
    "o": "vertical",
    "tag": "Campanha Publicitária",
    "title": "Marcos Catarina canta Vander Lee"
  },
  {
    "id": "1233104544",
    "p": "vimeo",
    "o": "vertical",
    "tag": "Minidocumentário",
    "title": "Aniversário do Barreiro Passeio Turístico no Barreiro"
  },
  {
    "id": "cA5QRMacEXE",
    "p": "youtube",
    "o": "vertical",
    "tag": "Minidocumentário",
    "title": "Aniversário do Barreiro Standup Thiago Carmona"
  },
  {
    "id": "fD5yOOhEugw",
    "p": "youtube",
    "o": "vertical",
    "tag": "Campanha Publicitária",
    "title": "Conselho da Massa"
  }
];

const manualThumbs = {
  "vTOH8dpboH0": "assets/thumbs/thumb-07-cPl8z5m_nwY.png.jpeg",
  "kRV6xSHG__w": "assets/thumbs/thumb-aula-violino-5WfArSZJtqQ.png",
  "1233098511": "assets/thumbs/thumb-rota-ius-1224267195-print-7.png",
  "4gZioQSLWYg": "assets/thumbs/thumb-minas-canta-cIyIuvIzV0g.png",
  "DdQKJTqSlWo": "assets/thumbs/thumb-cacau-show-MI6pCyYpMlc.png",
  "lcJuCTrI0wg": "assets/thumbs/thumb-grupo-avante-AVlMyYiXCCk.png",
  "llH5GXp3xow": "assets/thumbs/thumb-loja-galo-qnQ3ddtiaXE.png",
  "1233104545": "assets/thumbs/thumb-maes.jpg",
  "1233098510": "assets/thumbs/thumb-17-1196948372.png.jpeg",
  "TZOEGnF5968": "assets/thumbs/thumb-betim-rsau38g08H0.png",
  "DDvoJgs78XA": "assets/thumbs/thumb-10-CgfEWgE_8Aw.png.jpeg",
  "1233098512": "assets/thumbs/thumb-05-1194588209.png.jpeg",
  "1233104544": "assets/thumbs/thumb-tour-barreiro-f-1-GuYiWyw.png",
  "cA5QRMacEXE": "assets/thumbs/thumb-thiago-carmona-Lh0dqk9DdqI.png",
  "fD5yOOhEugw": "assets/thumbs/thumb-conselho-massa-zpbKSZBjGB8.png"
};

const modal = document.querySelector('#videoModal');
const pageContent = document.querySelector('#pageContent');
const modalPanel = modal.querySelector('.modal-panel');
const modalClose = document.querySelector('#modalClose');
const modalVideoWrap = document.querySelector('#modalVideoWrap');
const modalTitle = document.querySelector('#modalTitle');
const modalCategory = document.querySelector('#modalCategory');
const modalDirectLink = document.querySelector('#modalDirectLink');
const playerStatus = document.querySelector('#playerStatus');
let activePlayer = null;
let youtubeApiPromise = null;
let openSequence = 0;
let returnFocus = null;
let previousBodyPadding = '';

function directUrl(video) {
  return video.p === 'vimeo' ? `https://vimeo.com/${video.id}` : `https://www.youtube.com/watch?v=${video.id}`;
}

function thumbUrl(video) {
  return `${manualThumbs[video.id]}?v=${ASSET_VERSION}`;
}

function createCard(video, index) {
  const card = document.createElement('article');
  card.className = `video-card ${video.o}`;
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'video-trigger';
  button.dataset.videoId = video.id;
  button.setAttribute('aria-label', `Assistir: ${video.title} — ${video.tag}`);
  button.setAttribute('aria-haspopup', 'dialog');
  const image = document.createElement('img');
  image.src = thumbUrl(video);
  image.alt = `Frame do vídeo ${video.title}`;
  image.width = video.o === 'horizontal' ? 1600 : 608;
  image.height = video.o === 'horizontal' ? 900 : 1080;
  image.loading = video.o === 'horizontal' ? 'eager' : 'lazy';
  image.decoding = 'async';
  image.draggable = false;
  const play = document.createElement('span');
  play.className = 'play-icon';
  play.setAttribute('aria-hidden', 'true');
  const number = document.createElement('span');
  number.className = 'video-number';
  number.textContent = String(index + 1).padStart(2, '0');
  number.setAttribute('aria-hidden', 'true');
  button.append(image, play, number);
  const meta = document.createElement('div');
  meta.className = 'video-meta';
  const title = document.createElement('h3');
  title.textContent = video.title;
  const category = document.createElement('p');
  category.textContent = video.tag;
  meta.append(title, category);
  card.append(button, meta);
  button.addEventListener('click', () => openVideo(video, button));
  return card;
}

function renderPortfolio() {
  const horizontal = featuredVideos.filter(video => video.o === 'horizontal');
  const vertical = featuredVideos.filter(video => video.o === 'vertical');
  document.querySelector('#featuredGrid').replaceChildren(...horizontal.map(createCard));
  document.querySelector('#portfolioGrid').replaceChildren(...vertical.map(createCard));
}

function setPlayerStatus(message) {
  playerStatus.textContent = message;
  playerStatus.hidden = !message;
}

function loadYouTubeApi() {
  if (window.YT?.Player) return Promise.resolve();
  if (youtubeApiPromise) return youtubeApiPromise;
  youtubeApiPromise = new Promise((resolve, reject) => {
    const previousReady = window.onYouTubeIframeAPIReady;
    const script = document.createElement('script');
    const timer = window.setTimeout(fail, 12000);
    function fail() {
      window.clearTimeout(timer);
      script.remove();
      window.onYouTubeIframeAPIReady = previousReady;
      youtubeApiPromise = null;
      reject(new Error('YouTube indisponível'));
    }
    window.onYouTubeIframeAPIReady = () => {
      window.clearTimeout(timer);
      window.onYouTubeIframeAPIReady = previousReady;
      if (typeof previousReady === 'function') previousReady();
      resolve();
    };
    script.src = 'https://www.youtube.com/iframe_api';
    script.async = true;
    script.addEventListener('error', fail, { once: true });
    document.head.append(script);
  });
  return youtubeApiPromise;
}

function stopPlayer() {
  if (activePlayer) {
    try { activePlayer.destroy(); } catch { /* O iframe pode já ter sido removido. */ }
    activePlayer = null;
  }
  modalVideoWrap.replaceChildren();
}

async function openVideo(video, trigger = document.activeElement) {
  const sequence = ++openSequence;
  stopPlayer();
  returnFocus = trigger;
  modalTitle.textContent = video.title;
  modalCategory.textContent = video.tag;
  modalDirectLink.href = directUrl(video);
  modalDirectLink.textContent = `Abrir no ${video.p === 'vimeo' ? 'Vimeo' : 'YouTube'} ↗`;
  modalPanel.classList.toggle('is-vertical', video.o === 'vertical');
  modalVideoWrap.className = `modal-video-wrap ${video.o}`;
  setPlayerStatus('Carregando vídeo…');
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  previousBodyPadding = document.body.style.paddingRight;
  if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
  document.body.classList.add('modal-open');
  modal.hidden = false;
  pageContent.inert = true;
  modalClose.focus({ preventScroll: true });

  if (video.p === 'vimeo') {
    const iframe = document.createElement('iframe');
    iframe.src = `https://player.vimeo.com/video/${video.id}?autoplay=1&badge=0&autopause=0&muted=0#t=0s`;
    iframe.title = video.title;
    iframe.allow = 'autoplay; fullscreen; picture-in-picture; encrypted-media';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.addEventListener('load', () => {
      if (sequence === openSequence) setPlayerStatus('');
    }, { once: true });
    modalVideoWrap.append(iframe);
    return;
  }

  try {
    await loadYouTubeApi();
    if (modal.hidden || sequence !== openSequence) return;
    const mount = document.createElement('div');
    modalVideoWrap.append(mount);
    activePlayer = new window.YT.Player(mount, {
      videoId: video.id,
      playerVars: { autoplay: 1, controls: 1, playsinline: 1, rel: 0,
        ...(window.location.protocol !== 'file:' ? { origin: window.location.origin } : {}) },
      events: {
        onReady(event) {
          if (modal.hidden || sequence !== openSequence) return;
          event.target.getIframe().title = video.title;
          setPlayerStatus('');
          event.target.unMute();
          event.target.setVolume(100);
          event.target.playVideo();
        },
        onError() {
          if (sequence === openSequence) setPlayerStatus('Não foi possível reproduzir aqui. Use o link abaixo para assistir no YouTube.');
        },
      },
    });
  } catch {
    if (!modal.hidden && sequence === openSequence) {
      setPlayerStatus('Não foi possível carregar o player. Use o link abaixo para assistir no YouTube.');
    }
  }
}

function closeVideo() {
  if (modal.hidden) return;
  ++openSequence;
  stopPlayer();
  modal.hidden = true;
  pageContent.inert = false;
  document.body.classList.remove('modal-open');
  document.body.style.paddingRight = previousBodyPadding;
  setPlayerStatus('');
  if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
  returnFocus = null;
}

modalClose.addEventListener('click', closeVideo);
modal.querySelector('[data-close-modal]').addEventListener('click', closeVideo);
document.addEventListener('keydown', event => {
  if (modal.hidden) return;
  if (event.key === 'Escape') {
    event.preventDefault();
    closeVideo();
  }
  if (event.key === 'Tab') {
    const focusable = [...modal.querySelectorAll('button, a[href], iframe')];
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

document.querySelectorAll('[data-whatsapp]').forEach(link => {
  link.href = `https://wa.me/${CONTACT.phone}?text=${encodeURIComponent(CONTACT.message)}`;
  link.hidden = false;
});
renderPortfolio();
