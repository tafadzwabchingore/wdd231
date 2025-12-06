document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("welcomeOverlay");
  const lastVisit = localStorage.getItem("lastVisit");
  const now = Date.now();

  let message;

  if (!lastVisit) {
    message = "Welcome!!! Scroll down to explore our page 🎉";
  } else {
    const timePassed = now - parseInt(lastVisit);

    if (timePassed < 1000 * 60 * 60 * 24) {  
      message = "Yay! You are back so soon!!! 😄";
    } else {
      message = "Hey there, it's been a while since your last visit 👋";
    }
  }

  // Set message and show overlay
  overlay.textContent = message;
  overlay.style.display = "block";

  // Save current visit time
  localStorage.setItem("lastVisit", now);

  // Hide after 5 seconds
  setTimeout(() => {
    overlay.style.display = "none";
  }, 5000);
});
