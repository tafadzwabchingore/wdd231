// thankyou.js
const data = JSON.parse(sessionStorage.getItem('contactData') || '{}');

document.getElementById('firstName').textContent = data.firstName || 'N/A';
document.getElementById('lastName').textContent = data.lastName || 'N/A';
document.getElementById('email').textContent = data.email || 'N/A';
document.getElementById('mobile').textContent = data.mobile || 'N/A';
document.getElementById('timestamp').textContent = data.timestamp || 'N/A';

// Optionally clear storage
sessionStorage.removeItem('contactData');
