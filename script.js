/**
 * Hanna Peixoto Parente de Araújo — Portfólio
 * Scripts: menu mobile, ano do rodapé e envio do formulário de contato.
 */

document.addEventListener('DOMContentLoaded', function () {
  setupMobileNav();
  setFooterYear();
  setupContactForm();
});

/**
 * Abre/fecha o menu de navegação em telas pequenas
 * e mantém os atributos ARIA sincronizados para leitores de tela.
 */
function setupMobileNav() {
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('primaryNav');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    var isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Fecha o menu ao clicar em um link (útil em telas pequenas)
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Fecha o menu com a tecla Esc
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });
}

/**
 * Preenche o ano atual no rodapé automaticamente.
 */
function setFooterYear() {
  var anoEl = document.getElementById('anoAtual');
  if (anoEl) {
    anoEl.textContent = new Date().getFullYear();
  }
}

/**
 * Valida e "envia" a mensagem do formulário de contato.
 * Sem um backend configurado, isso apenas confirma visualmente o envio.
 * Para enviar de verdade, integre com um serviço de formulários
 * (ex.: Formspree, EmailJS) ou uma API própria.
 */
function setupContactForm() {
  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');

  if (!form || !status) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (!form.checkValidity()) {
      status.textContent = 'Por favor, preencha nome, e-mail e mensagem corretamente.';
      status.style.color = '#C0392B';
      return;
    }

    var nome = form.nome.value.trim();

    status.textContent = 'Obrigada, ' + nome + '! Sua mensagem foi registrada.';
    status.style.color = 'var(--color-accent)';
    form.reset();
  });
}
