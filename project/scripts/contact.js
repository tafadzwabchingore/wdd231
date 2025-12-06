import { initModals } from './modals.js';

initModals();

const form = document.getElementById('contactForm');
const timestampField = document.getElementById('timestamp');

form.addEventListener('submit', async (e) => {
  e.preventDefault(); // prevent default redirect

  // Update timestamp
  timestampField.value = new Date().toISOString();

  // Convert form data to plain object
  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  try {
    // Send data to Web3Forms via fetch
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();

    if (result.success) {
      // Store data in sessionStorage for thank-you page
      sessionStorage.setItem('contactData', JSON.stringify(data));

      // Redirect after successful submission
      window.location.href = 'thankyou.html';
    } else {
      alert('Oops! Something went wrong. Please try again.');
      console.error(result);
    }
  } catch (err) {
    alert('An error occurred. Please try again later.');
    console.error(err);
  }
});
