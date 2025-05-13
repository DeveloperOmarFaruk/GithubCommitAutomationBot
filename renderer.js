const { ipcRenderer } = require("electron");

window.onload = () => {
  document.getElementById("start-btn").addEventListener("click", () => {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    ipcRenderer.send("start-script", { email, password });
  });

  // Listen for clear-fields event
  ipcRenderer.on("clear-fields", () => {
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
  });
};
