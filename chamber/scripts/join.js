// FILL TIMESTAMP ONLY ON JOIN PAGE
const timestampField = document.getElementById("timestamp");
if (timestampField) {
    timestampField.value = new Date().toISOString();
}

// MODALS — ONLY RUN IF BUTTONS EXIST
const openButtons = document.querySelectorAll('[data-open]');
openButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const modal = document.getElementById(btn.dataset.open);
    if (modal) modal.showModal();
  });
});

const closeButtons = document.querySelectorAll('.close-btn');
closeButtons.forEach(btn => {
  btn.addEventListener('click', () => btn.parentElement.close());
});

// CLOSE WHEN CLICK OUTSIDE
document.querySelectorAll('dialog').forEach(modal => {
  modal.addEventListener('click', (e) => {
    const rect = modal.getBoundingClientRect();
    const outside =
      e.clientX < rect.left || e.clientX > rect.right ||
      e.clientY < rect.top  || e.clientY > rect.bottom;

    if (outside) modal.close();
  });
});

// CUSTOM VALIDATION
const orgInput = document.getElementById('org-title');
const hint = document.getElementById('org-title-hint');

if (orgInput) {
    function validateOrgTitle() {
        if (!orgInput.value) {
            orgInput.setCustomValidity('');
            hint.textContent = '';
            return;
        }

        if (!orgInput.checkValidity()) {
            const msg =
                'Organizational title must be at least 7 characters and contain only letters, spaces, or hyphens.';
            orgInput.setCustomValidity(msg);
            hint.textContent = msg;
        } else {
            orgInput.setCustomValidity('');
            hint.textContent = '';
        }
    }

    orgInput.addEventListener('input', validateOrgTitle);
    orgInput.addEventListener('blur', validateOrgTitle);
    validateOrgTitle();
}