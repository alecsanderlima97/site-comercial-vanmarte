const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');

menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

const phoneInput = document.querySelector('input[name="telefone"]');
phoneInput?.addEventListener('input', event => {
  const digits = event.target.value.replace(/\D/g, '').slice(0, 11);
  event.target.value = digits.length <= 10
    ? digits.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{4})(\d)/, '$1-$2')
    : digits.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2');
});

document.querySelector('#quoteForm')?.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const lines = [
    'Olá, Vanmarte! Gostaria de solicitar um orçamento.',
    '',
    `Nome: ${data.get('nome')}`,
    `WhatsApp: ${data.get('telefone')}`,
    `Empresa: ${data.get('empresa') || 'Não informado'}`,
    `Cidade: ${data.get('cidade')}`,
    `Produto: ${data.get('produto')}`,
    `Quantidade: ${data.get('quantidade') || 'Não informada'}`,
    `Medidas e detalhes: ${data.get('detalhes')}`
  ];
  window.open(`https://wa.me/5515996297072?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');
});

const carousel = document.querySelector('[data-carousel]');
if (carousel) {
  const slides = Array.from(carousel.querySelectorAll('.gallery-item'));
  const dots = carousel.querySelector('.gallery-dots');
  let index = 0;
  let timer;

  const showSlide = nextIndex => {
    index = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => slide.classList.toggle('is-active', slideIndex === index));
    dots.querySelectorAll('button').forEach((dot, dotIndex) => {
      dot.classList.toggle('is-active', dotIndex === index);
      dot.setAttribute('aria-selected', String(dotIndex === index));
    });
  };

  slides.forEach((_, slideIndex) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Ver imagem ${slideIndex + 1}`);
    dot.addEventListener('click', () => showSlide(slideIndex));
    dots.append(dot);
  });

  carousel.querySelector('.gallery-prev').addEventListener('click', () => showSlide(index - 1));
  carousel.querySelector('.gallery-next').addEventListener('click', () => showSlide(index + 1));
  const stop = () => window.clearInterval(timer);
  const start = () => { stop(); timer = window.setInterval(() => showSlide(index + 1), 6500); };
  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);
  carousel.addEventListener('focusin', stop);
  carousel.addEventListener('focusout', start);
  showSlide(0);
  start();
}
