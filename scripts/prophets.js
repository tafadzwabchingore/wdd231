// prophets.js

const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');

async function getProphetData() {
  const response = await fetch(url);
  const data = await response.json();
  // console.table(data.prophets); // for testing
  displayProphets(data.prophets);
}

const displayProphets = (prophets) => {
  prophets.forEach((prophet) => {
    // Create elements to add to the div.cards element
    let card = document.createElement('section');
    let fullName = document.createElement('h2');
    let birthInfo = document.createElement('p');
    let birthplace = document.createElement('p');
    let portrait = document.createElement('img');

    // Build the content
    fullName.textContent = `${prophet.name} ${prophet.lastname}`;
    birthInfo.textContent = `Date of Birth: ${prophet.birthdate}`;
    birthplace.textContent = `Place of Birth: ${prophet.birthplace}`;

    // Build the image portrait by setting all the relevant attributes
    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');

    // Append the section(card) with the created elements
    card.appendChild(fullName);
    card.appendChild(birthInfo);
    card.appendChild(birthplace);
    card.appendChild(portrait);

    cards.appendChild(card);
  });
}

getProphetData();