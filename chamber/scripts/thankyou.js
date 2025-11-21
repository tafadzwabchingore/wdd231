/* CONFETTI ANIMATION */
function startConfetti() {
    const canvas = document.getElementById("confetti-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confetti = [];
    for (let i = 0; i < 150; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * -canvas.height,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            size: Math.random() * 8 + 4,
            speed: Math.random() * 3 + 2
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confetti.forEach(c => {
            c.y += c.speed;
            if (c.y > canvas.height) c.y = -10;
            ctx.fillStyle = c.color;
            ctx.fillRect(c.x, c.y, c.size, c.size);
        });
        requestAnimationFrame(animate);
    }

    animate();
}

startConfetti();

/* DISPLAY FORM DATA */
window.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const container = document.getElementById("data-container");

    const fields = [
        { label: "First Name", value: params.get("first-name") },
        { label: "Last Name", value: params.get("last-name") },
        { label: "Organizational Title", value: params.get("org-title") },
        { label: "Email", value: params.get("email") },
        { label: "Mobile Phone", value: params.get("phone") },
        { label: "Business / Organization", value: params.get("organization") },
        { label: "Submission Timestamp", value: params.get("timestamp") }
    ];

    container.innerHTML = fields
        .map(f => `<p><strong>${f.label}:</strong> ${f.value || "N/A"}</p>`)
        .join("");
});