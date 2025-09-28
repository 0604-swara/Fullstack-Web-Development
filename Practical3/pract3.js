function updateDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    document.getElementById('date').textContent = `It is ${date}`;
    document.getElementById('time').textContent = `It is ${time}`;
}

// Update time immediately and every second
updateDateTime();
setInterval(updateDateTime, 1000);
