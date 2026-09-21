/**
 * Hanna Peixoto Parente de Araújo — Portfólio
 * Scripts: menu mobile, ano do rodapé e envio do formulário de contato.
 */

document.addEventListener('DOMContentLoaded', function () {
  setupMobileNav();
  setFooterYear();
  setupContactForm();

  const trilho = document.getElementById('trilho');
  const body = document.body;

  if (trilho) {
    trilho.addEventListener('click', () => {
      trilho.classList.toggle('dark');
      body.classList.toggle('dark');
    });
  }
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

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

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

// ========================================
// MODAL DOS CERTIFICADOS
// ========================================

const certificateModal = document.getElementById("certificateModal");
const certificateImage = document.getElementById("certificateImage");
const certificateClose = document.getElementById("certificateClose");
const certificateTitle = document.getElementById("certificateModalTitle");


// Encontra todos os botões "Ver certificado"
const certificateButtons = document.querySelectorAll(".certificate-button");


// Abre o certificado
certificateButtons.forEach((button) => {
  button.addEventListener("click", () => {

    const imageSrc = button.dataset.certificate;
    const title =
      button.dataset.certificateTitle || "Certificado";

    certificateImage.src = imageSrc;
    certificateImage.alt = title;
    certificateTitle.textContent = title;

    certificateModal.classList.add("is-open");
    certificateModal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");
  });
});


// Fecha o certificado
function fecharCertificado() {
  certificateModal.classList.remove("is-open");
  certificateModal.setAttribute("aria-hidden", "true");

  document.body.classList.remove("modal-open");
}


// Clique no X
certificateClose.addEventListener("click", fecharCertificado);


// Clique fora do certificado
certificateModal.addEventListener("click", (event) => {

  if (event.target === certificateModal) {
    fecharCertificado();
  }

});


// Tecla ESC também fecha
document.addEventListener("keydown", (event) => {

  if (
    event.key === "Escape" &&
    certificateModal.classList.contains("is-open")
  ) {
    fecharCertificado();
  }

});