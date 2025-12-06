export function initModals() {
  const modalButtons = document.querySelectorAll('[data-modal]');
  const modals = document.querySelectorAll('.modal');

  modalButtons.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const modalId = btn.dataset.modal;
      const modal = document.getElementById(modalId);
      if (!modal) return;

      modal.setAttribute('aria-hidden', 'false');

      // Focus the close button
      const closeBtn = modal.querySelector('.close');
      if (closeBtn) closeBtn.focus();

      // Escape key closes modal
      const escHandler = ev => {
        if (ev.key === 'Escape') {
          modal.setAttribute('aria-hidden', 'true');
          document.removeEventListener('keydown', escHandler);
        }
      };
      document.addEventListener('keydown', escHandler);
    });
  });

  modals.forEach(modal => {
    // Close button
    const closeBtn = modal.querySelector('.close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.setAttribute('aria-hidden', 'true');
      });
    }

    // Click outside modal content
    modal.addEventListener('click', e => {
      if (e.target === modal) {
        modal.setAttribute('aria-hidden', 'true');
      }
    });
  });
}
