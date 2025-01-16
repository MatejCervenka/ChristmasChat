// Example script to handle login, room creation, and chat
document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");

    if (document.getElementById("loginForm")) {
        document.getElementById("loginForm").addEventListener("submit", async (e) => {
            e.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password }),
                });
                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem("token", data.token);
                    window.location.href = "/room.html";
                } else {
                    document.getElementById("errorMessage").innerText = data.message;
                }
            } catch (error) {
                document.getElementById("errorMessage").innerText = "Error logging in.";
            }
        });
    }

    if (document.getElementById("roomForm")) {
        document.getElementById("roomForm").addEventListener("submit", (e) => {
            e.preventDefault();
            const roomName = document.getElementById("roomName").value;
            const restricted = document.getElementById("restricted").checked;
            console.log("Room created:", { roomName, restricted });
            window.location.href = "/index.html";
        });
    }

    if (document.getElementById("messageForm")) {
        const socket = io(); // Connect to WebSocket
        document.getElementById("messageForm").addEventListener("submit", (e) => {
            e.preventDefault();
            const message = document.getElementById("messageInput").value;
            socket.emit("message", { message });
            document.getElementById("messageInput").value = "";
        });

        socket.on("message", (data) => {
            const messages = document.getElementById("messages");
            const messageDiv = document.createElement("div");
            messageDiv.innerText = `${data.user}: ${data.message}`;
            messages.appendChild(messageDiv);
        });
    }
});
