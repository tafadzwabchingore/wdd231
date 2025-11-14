// Function to get a specified number of unique random items from an array
function getRandomUnique(arr, num) {
    if (arr.length === 0) return [];
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(num, arr.length));
}

// Function to create the HTML string for a member card
function createMemberCardHTML(member) {
    return `
        <div class="member-card-spotlight">
            <img src="${member.image}" alt="${member.name} Logo" loading="lazy">
            <h3>${member.name}</h3>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> <a href="tel:${member.phone}">${member.phone}</a></p>
            <p><strong>Website:</strong> 
                <a href="${member.website}" target="_blank">
                    ${member.website.replace('https://', '').replace('http://', '')}
                </a>
            </p>
            <p class="membership-badge ${member.membershipLevel}">
                ${member.membershipLevel} Member
            </p>
        </div>
    `;
}

// Main async function to fetch, filter, and display members
async function displayMemberSpotlight() {
    const cardWrapper = document.getElementById('cardWrapper');
    const container = document.getElementById('memberSpotlight');

    if (!container || !cardWrapper) {
        console.error('Member section or card wrapper not found.');
        return;
    }

    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const members = await response.json();

        // ✅ FIX: create eligibleMembers here
        const eligibleMembers = members.filter(m => 
            m.membershipLevel === "Gold" || 
            m.membershipLevel === "Silver"
        );

        const numberOfSpotlights = 3;
        const selectedMembers = getRandomUnique(eligibleMembers, numberOfSpotlights);

        selectedMembers.forEach(member => {
            const cardHTML = createMemberCardHTML(member);
            cardWrapper.insertAdjacentHTML('beforeend', cardHTML);
        });

    } catch (error) {
        console.error('Failed to load or process member data:', error);
        container.insertAdjacentHTML('beforeend', 
            '<p>Sorry, we could not load the member spotlight at this time.</p>'
        );
    }
}

displayMemberSpotlight();