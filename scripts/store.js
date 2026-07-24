document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('[data-qty]');
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const target = document.getElementById(button.dataset.qty);
      if (!target) return;
      const current = Number(target.textContent);
      const delta = button.classList.contains('minus') ? -1 : 1;
      target.textContent = Math.max(1, current + delta);
    });
  });

  const forms = document.querySelectorAll('form[data-feedback]');
  forms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const status = form.querySelector('[data-feedback-message]');
      if (status) {
        status.textContent = 'Thanks! Your request was received.';
      }
    });
  });
});
