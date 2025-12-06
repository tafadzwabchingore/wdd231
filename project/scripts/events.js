const programs = [
    {
        "title": "Parenting 101 Workshop",
        "description": "Learn practical parenting tips and strategies for everyday challenges.",
        "duration_minutes": 90,
        "topics": ["Communication", "Discipline", "Child Development"],
        "online": true,
        "location": "Online",
        "date": "2025-12-10"
    },
    {
        "title": "Teen Mental Health Seminar",
        "description": "Guidance for supporting teen mental health and well-being.",
        "duration_minutes": 120,
        "topics": ["Stress Management", "Anxiety", "Peer Pressure"],
        "online": false,
        "location": "Sunrise Community Hall",
        "date": "2025-12-12"
    },
    {
        "title": "Family Budgeting Session",
        "description": "Learn how to manage family finances and savings effectively.",
        "duration_minutes": 60,
        "topics": ["Budgeting", "Saving", "Planning"],
        "online": true,
        "location": "Online",
        "date": "2025-12-14"
    },
    {
        "title": "Career Guidance for Teens",
        "description": "Help teens explore career options and plan for their future.",
        "duration_minutes": 75,
        "topics": ["Career Assessment", "Resume Tips", "Interview Skills"],
        "online": false,
        "location": "City Youth Center",
        "date": "2025-12-15"
    },
    {
        "title": "Healthy Lifestyle Coaching",
        "description": "Advice for families on nutrition, exercise, and wellness habits.",
        "duration_minutes": 90,
        "topics": ["Nutrition", "Exercise", "Wellness"],
        "online": true,
        "location": "Online",
        "date": "2025-12-16"
    },
    {
        "title": "Conflict Resolution Workshop",
        "description": "Techniques to resolve conflicts peacefully within families.",
        "duration_minutes": 60,
        "topics": ["Communication", "Problem Solving", "Empathy"],
        "online": true,
        "location": "Online",
        "date": "2025-12-17"
    },
    {
        "title": "Digital Safety for Teens",
        "description": "Guidance on safe internet and social media use for youth.",
        "duration_minutes": 45,
        "topics": ["Cyberbullying", "Privacy", "Social Media Awareness"],
        "online": true,
        "location": "Online",
        "date": "2025-12-18"
    },
    {
        "title": "Family Wellness Day",
        "description": "Interactive activities promoting mental and physical wellness.",
        "duration_minutes": 180,
        "topics": ["Mindfulness", "Exercise", "Nutrition"],
        "online": false,
        "location": "Greenwood Park",
        "date": "2025-12-20"
    },
    {
        "title": "Time Management for Teens",
        "description": "Tips for teens to manage school, hobbies, and family life.",
        "duration_minutes": 60,
        "topics": ["Scheduling", "Prioritization", "Goal Setting"],
        "online": true,
        "location": "Online",
        "date": "2025-12-21"
    },
    {
        "title": "Positive Parenting Techniques",
        "description": "Strategies to foster positive behavior and development.",
        "duration_minutes": 90,
        "topics": ["Positive Reinforcement", "Boundaries", "Communication"],
        "online": false,
        "location": "Maple Community Hall",
        "date": "2025-12-22"
    },
    {
        "title": "Stress Management for Families",
        "description": "Learn ways to manage family stress and build resilience.",
        "duration_minutes": 60,
        "topics": ["Relaxation Techniques", "Time Management", "Communication"],
        "online": true,
        "location": "Online",
        "date": "2025-12-23"
    },
    {
        "title": "Educational Support for Teens",
        "description": "Guidance on homework, study habits, and learning strategies.",
        "duration_minutes": 75,
        "topics": ["Study Skills", "Motivation", "Time Management"],
        "online": false,
        "location": "Downtown Library",
        "date": "2025-12-24"
    },
    {
        "title": "Healthy Communication Workshop",
        "description": "Techniques for effective family communication and listening.",
        "duration_minutes": 90,
        "topics": ["Active Listening", "Conflict Resolution", "Empathy"],
        "online": true,
        "location": "Online",
        "date": "2025-12-26"
    },
    {
        "title": "Building Confidence in Youth",
        "description": "Programs to empower teens and develop self-esteem.",
        "duration_minutes": 60,
        "topics": ["Self-Esteem", "Goal Setting", "Public Speaking"],
        "online": false,
        "location": "City Youth Center",
        "date": "2025-12-27"
    },
    {
        "title": "Family Goal-Setting Session",
        "description": "Help families create and achieve collective goals together.",
        "duration_minutes": 120,
        "topics": ["Goal Setting", "Teamwork", "Motivation"],
        "online": true,
        "location": "Online",
        "date": "2025-12-28"
    }
];

const container = document.getElementById("events-container");
const statusElement = document.getElementById("update-status");
const itemsPerPage = 3;
const updateIntervalMs = 1800 * 1000; // 30 minutes

/**
 * Selects a fixed number of unique programs randomly from the array.
 * @returns {Array} An array of selected program objects.
 */
function getRandomPrograms() {
    const totalPrograms = programs.length;
    const selectedIndices = new Set();
    
    while (selectedIndices.size < itemsPerPage && selectedIndices.size < totalPrograms) {
        const randomIndex = Math.floor(Math.random() * totalPrograms);
        selectedIndices.add(randomIndex);
    }

    return Array.from(selectedIndices).map(index => programs[index]);
}

/**
 * Formats a date string (YYYY-MM-DD) to a more readable format.
 * @param {string} dateStr 
 * @returns {string} Formatted date, e.g., "Dec 10, 2025"
 */
function formatDate(dateStr) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
}

/**
 * Renders the selected events to the container with a subtle fade effect.
 * @param {Array} selectedPrograms 
 */
function renderEvents(selectedPrograms) {
    container.classList.add('opacity-0');

    setTimeout(() => {
        container.innerHTML = "";
        selectedPrograms.forEach(event => {
            const isOnline = event.online;
            let locationIcon, iconClass;

            if (isOnline) {
                iconClass = 'icon-online';
                locationIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 ${iconClass} mr-2">
                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6.75a.75.75 0 00.75.75h4.5a.75.75 0 000-1.5h-3v-5.25z" clip-rule="evenodd" />
                </svg>`;
            } else {
                iconClass = 'icon-inperson';
                locationIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 ${iconClass} mr-2">
                    <path fill-rule="evenodd" d="M11.54 22.351A8.287 8.287 0 0018 10.749V7.5a6 6 0 00-7.5-6H10.5a6 6 0 00-7.5 6v3.249c0 3.829 2.3 7.152 5.511 8.563l.63.284a1.875 1.875 0 001.817 0l.63-.284zM12 11.25a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" clip-rule="evenodd" />
                </svg>`;
            }

            const card = document.createElement("div");
            card.className = "event-card";

            card.innerHTML = `
                <div>
                    <h2>${event.title}</h2>
                    <p class="description">${event.description}</p>
                    <p class="event-date"><strong>Date:</strong> ${formatDate(event.date)}</p>
                    
                    <div class="info-section">
                        <div class="info-item">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 icon-time mr-2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <strong>Duration:</strong> ${event.duration_minutes} min
                        </div>
                        <div class="info-item">
                            ${locationIcon}
                            <strong>Location:</strong> ${event.location} (${isOnline ? "Online" : "In-Person"})
                        </div>
                    </div>

                    <p class="topic-header">Topics Covered:</p>
                    <ul class="topic-list">
                        ${event.topics.map(topic => `<li>${topic}</li>`).join('')}
                    </ul>
                </div>
            `;
            container.appendChild(card);
        });

        container.classList.remove('opacity-0');
    }, 50);
}

function swapPrograms() {
    const newPrograms = getRandomPrograms();
    renderEvents(newPrograms);
    statusElement.textContent = `Programs updated on ${new Date().toLocaleTimeString()}. Next update in 30 minutes.`;
}

// Initial render on load
window.onload = function() {
    swapPrograms();
    setInterval(swapPrograms, updateIntervalMs);
};

/************************** Discover Page: Display all 15 Objects ***************************/
// Render all 15 programs using map()
function renderAllPrograms() {
    const grid = document.getElementById("all-programs-grid");

    const allCards = programs.map((program, index) => {
        return `
        <div class="program-card" style="grid-area: card${index + 1}">
            <h2>${program.title}</h2>
            <p>${program.description}</p>

            <p><strong>Date:</strong> ${program.date}</p>
            <p><strong>Duration:</strong> ${program.duration_minutes} minutes</p>
            <p><strong>Location:</strong> ${program.location} (${program.online ? "Online" : "In-Person"})</p>

            <p><strong>Topics:</strong></p>
            <ul class="topics">
                ${program.topics.map(t => `<li>${t}</li>`).join("")}
            </ul>
        </div>
        `;
    }).join("");

    grid.innerHTML = allCards;
}

// Load all programs on page load (separate from your rotation script)
window.addEventListener("DOMContentLoaded", renderAllPrograms);
