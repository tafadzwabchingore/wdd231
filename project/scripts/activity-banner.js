let activities = [];
let currentIndex = 0;
const duration = 60 * 1000; // 1 minute per activity

const titleEl = document.getElementById('activity-title');
const descEl = document.getElementById('activity-description');
const typeCostEl = document.getElementById('activity-type-cost');
const durationEl = document.getElementById('activity-duration');

function showActivity(index) {
    const activity = activities[index];
    titleEl.textContent = activity.title;
    descEl.textContent = activity.description;
    typeCostEl.textContent = activity.type + " | " + activity.cost;
    durationEl.textContent = "Duration: " + activity.duration_min + " min";
    document.querySelector('.banner-container').style.background = getRandomColor();
}

function getRandomColor() {
    const colors = ["#fff"];
    return colors[Math.floor(Math.random() * colors.length)];
}

function nextActivity() {
    currentIndex = (currentIndex + 1) % activities.length;
    showActivity(currentIndex);
}

function init() {
    fetch('data/activities.json')
        .then(response => response.json())
        .then(data => {
            activities = data;
            showActivity(currentIndex);
            setInterval(nextActivity, duration);
        })
        .catch(err => {
            titleEl.textContent = "Error fetching activity";
            descEl.textContent = "Please try again later.";
            console.error(err);
        });
}

init();
