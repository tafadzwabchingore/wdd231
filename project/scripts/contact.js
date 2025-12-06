import { initModals } from './modals.js';

initModals();

const form = document.getElementById('contactForm');
const timestampField = document.getElementById('timestamp');

async function handleFormSubmit(e) {
  e.preventDefault(); // Prevent default form redirect

  try {
    // Update timestamp
    timestampField.value = new Date().toISOString();

    // Convert form data to plain object
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // Send data to Web3Forms
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();

    if (result.success) {
      // Store data for thank-you page
      sessionStorage.setItem('contactData', JSON.stringify(data));

      // Redirect to thank-you page
      window.location.href = 'thankyou.html';
    } else {
      console.error(result);
      alert('Oops! Something went wrong. Please try again.');
    }

  } catch (error) {
    console.error(error);
    alert('An error occurred. Please try again later.');
  }
}

// Attach event listener
form.addEventListener('submit', handleFormSubmit);

