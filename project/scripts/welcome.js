document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("welcomeMessage");
  const lastVisit = localStorage.getItem("lastVisit");
  const now = Date.now();

  let message = "";

  if (!lastVisit) {
    // First visit
    message = "Welcome!!! Scroll down to explore our page 🎉";
  } else {
    const timePassed = now - parseInt(lastVisit);

    // Convert ms → days, hours, minutes
    const minutes = Math.floor(timePassed / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const displayMinutes = minutes % 60;
    const displayHours = hours % 24;

    let timeText = `${days}d ${displayHours}h ${displayMinutes}m ago`;

    if (timePassed < 1000 * 60 * 60 * 24) {
      // Visited today
      message = `Yay! Glad you're continuing to explore our page since your last visit ${displayHours}h ${displayMinutes}m ago`;
    } else {
      // More than 1 day
      message = `Hey there, it's been a while since your last visit ${timeText} ago! Welcome back!`;
    }
  }

  // Show message
  overlay.textContent = message;
  overlay.style.display = "block";

  // Save current visit time
  localStorage.setItem("lastVisit", now);

  // Hide after 5 seconds
  setTimeout(() => {
    overlay.style.display = "none";
  }, 500000);
});
