// Function to format the date nicely (e.g., Nov 25, 2025)
function formatEventDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Function to create the HTML string for an event card
function createEventCardHTML(event) {
    const formattedDate = formatEventDate(event.date);
    return `
        <div class="event-card">
            <img src="${event.image}" alt="Image for ${event.name}" loading="lazy">
            <h2>${event.name}</h2>
            <p class="event-info">📅${formattedDate} at ${event.time}</p>
            <p><strong>📌Location:</strong> ${event.location}</p>
            <p>${event.description}</p>
        </div>
    `;
}

// Main async function to fetch, sort, and display events
async function displayUpcomingEvents() {
    const cardWrapper = document.getElementById('eventCardWrapper');
    const container = document.getElementById('upcomingEvents');
    
    if (!container || !cardWrapper) {
        console.error('Event section or card wrapper not found.');
        return;
    }

    try {
        // --- 1. Fetch JSON data ---
        const response = await fetch('data/events.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const events = await response.json();

        const today = new Date();
        // Set time to start of day for accurate comparison
        today.setHours(0, 0, 0, 0); 
        
        // --- 2. Filter for upcoming events (date is today or in the future) ---
        const upcomingEvents = events.filter(event => {
            // Compare event date (as Date object) with today
            return new Date(event.date) >= today; 
        });

        // --- 3. Sort events by date (ascending) ---
        upcomingEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

        // --- 4. Select the top 3 events (or fewer if less are available) ---
        const eventsToDisplay = upcomingEvents.slice(0, 3);
        
        // --- 5. Generate and insert HTML ---
        if (eventsToDisplay.length === 0) {
            cardWrapper.innerHTML = '<p style="text-align: center;">There are no upcoming events scheduled at this time.</p>';
        } else {
            eventsToDisplay.forEach(event => {
                const cardHTML = createEventCardHTML(event);
                cardWrapper.insertAdjacentHTML('beforeend', cardHTML);
            });
        }

    } catch (error) {
        console.error('Failed to load or process event data:', error);
        container.insertAdjacentHTML('beforeend', '<p style="text-align: center; color: red;">Error: Could not load events. Check the file path and JSON format.</p>');
    }
}

// Call the main function to start the display process
displayUpcomingEvents();