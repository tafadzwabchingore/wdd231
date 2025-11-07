// DOM references
const memberContainer = document.getElementById('memberContainer');
const gridViewBtn = document.getElementById('gridViewBtn');
const listViewBtn = document.getElementById('listViewBtn');

// Fetch members from JSON
async function fetchMembers() {
  try {
    const response = await fetch('members.json');
    if (!response.ok) throw new Error('Failed to fetch member data');
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    memberContainer.innerHTML = `<p style="color:red;">Error loading members: ${error.message}</p>`;
  }
}

// Display member cards
function displayMembers(members) {
  memberContainer.innerHTML = ''; // clear existing cards

  members.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('member-card');

    card.innerHTML = `
      <img src="${member.image}" alt="${member.name}">
      <div class="member-info">
        <h2>${member.name}</h2>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
        <p>${member.description}</p>
        <p><strong>Membership Level:</strong> ${member.membershipLevel}</p>
      </div>
    `;

    memberContainer.appendChild(card);
  });
}

// Toggle view buttons
gridViewBtn.addEventListener('click', () => {
  memberContainer.classList.add('grid-view');
  memberContainer.classList.remove('list-view');
});

listViewBtn.addEventListener('click', () => {
  memberContainer.classList.add('list-view');
  memberContainer.classList.remove('grid-view');
});

// Initialize
fetchMembers();