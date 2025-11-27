// scripts/discover.js
// ES module: imports discoverItems from data/discoverItems.mjs

import { discoverItems } from '../data/discover-items.mjs';

// Utility: create element with classes and text
function el(tag, options = {}) {
  const node = document.createElement(tag);
  if (options.class) node.className = options.class;
  if (options.text) node.textContent = options.text;
  if (options.html) node.innerHTML = options.html;
  if (options.attrs) {
    for (const [k, v] of Object.entries(options.attrs)) node.setAttribute(k, v);
  }
  return node;
}

function buildDiscoverGrid() {
  const grid = document.querySelector('.discover-grid');
  if (!grid) return;

  // Clear any existing content
  grid.innerHTML = '';

  // Add cards with grid-area assignment (card1..card8)
  discoverItems.forEach((item, idx) => {
    // Create card container
    const card = document.createElement('article');
    card.className = 'discover-card';
    card.setAttribute('role', 'article');

    // Figure with image
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.title;
    img.width = 300;
    img.height = 200;
    figure.appendChild(img);
    card.appendChild(figure);

    // Content container
    const content = document.createElement('div');
    content.className = 'discover-content';

    const title = document.createElement('h2');
    title.textContent = item.title;
    content.appendChild(title);

    const address = document.createElement('address');
    address.textContent = item.address;
    content.appendChild(address);

    const description = document.createElement('p');
    description.textContent = item.description;
    content.appendChild(description);

    // Learn more button
    const btn = document.createElement('button');
    btn.className = 'learn-more';
    btn.textContent = 'Learn more';
    btn.setAttribute('data-id', item.id);
    btn.setAttribute('aria-haspopup', 'dialog');
    content.appendChild(btn);

    card.appendChild(content);

    // Assign a data-slot for CSS grid positioning
    card.dataset.slot = `card${idx + 1}`;

    // Append card to grid
    grid.appendChild(card);
  });
}

function wireDialog() {
  const dialog = document.getElementById('discover-dialog');
  if (!dialog) return;

  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('.learn-more');
    if (!btn) return;

    const id = btn.getAttribute('data-id');
    const item = discoverItems.find(x => x.id === id);
    if (!item) return;

    dialog.innerHTML = `
      <button class="dialog-close" aria-label="Close dialog">Close</button>
      <h2>${item.title}</h2>
      <address>${item.address}</address>
      <figure style="margin:1rem 0;"><img src="${item.image}" alt="${item.title}" width="300" height="200" style="width:100%;height:auto;object-fit:cover;border-radius:8px;"></figure>
      <p>${item.more || item.description}</p>
    `;
    dialog.showModal();

    dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
    // close when clicking backdrop
    dialog.addEventListener('click', (ev) => {
      const rect = dialog.getBoundingClientRect();
      const inside = ev.clientX >= rect.left && ev.clientX <= rect.right && ev.clientY >= rect.top && ev.clientY <= rect.bottom;
      if (!inside) dialog.close();
    }, { once: true });
  });
}

/* LAST VISIT MESSAGE using localStorage */
/**
 * Updates the content of the pre-existing .visit-message element
 * based on the user's last visit timestamp stored in localStorage.
 */
function showVisitMessage() {
  // Select the existing visit-message element.
  // Assuming it is now always present in the HTML structure.
  const messageEl = document.querySelector('.visit-message');

  // If the element doesn't exist for some reason, exit the function.
  if (!messageEl) {
    console.warn('The .visit-message element was not found in the DOM.');
    return;
  }

  const now = Date.now();
  const key = 'discover-last-visit';
  const prev = localStorage.getItem(key);

  if (!prev) {
    // First visit
    messageEl.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const prevMillis = Number(prev);
    const timeDifference = now - prevMillis;

    // Time constants in milliseconds
    const MS_IN_HOUR = 1000 * 60 * 60;
    const MS_IN_DAY = MS_IN_HOUR * 24;

    const diffHours = Math.floor(timeDifference / MS_IN_HOUR);
    
    if (diffHours < 24) {
      // Less than 24 hours since the last visit
      messageEl.textContent = "Back so soon! Awesome!";
    } else {
      // 24 hours or more since the last visit
      const diffDays = Math.floor(timeDifference / MS_IN_DAY);
      messageEl.textContent = `You last visited ${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago.`;
    }
  }

  // Save current visit timestamp
  localStorage.setItem(key, String(now));
}

/* After DOM loaded */
window.addEventListener('DOMContentLoaded', () => {
  buildDiscoverGrid();
  wireDialog();
  showVisitMessage();

  // place the built cards into the named grid areas by matching data-slot -> grid area
  const grid = document.querySelector('.discover-grid');
  // ensure cards have correct grid-area names to match CSS ordering
  discoverItems.forEach((item, idx) => {
    const selector = `.discover-card[data-slot="card${idx+1}"]`;
    const card = grid.querySelector(selector);
    if (card) {
      card.style.gridArea = `card${idx+1}`;
    }
  });
});
