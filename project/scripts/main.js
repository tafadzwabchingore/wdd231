// main.js
import { initializeUI } from './modules/ui.js';
import { initializeActivityBanner } from './activity-banner.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeUI();
    
    // Initialize the activity banner on the home page
    if (document.getElementById('activity-banner')) {
        initializeActivityBanner();
    }
});