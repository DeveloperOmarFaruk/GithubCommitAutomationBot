const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { fork } = require("child_process");
const fs = require("fs");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "./renderer.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile("index.html");
}

ipcMain.on("start-script", (event, credentials) => {
  fs.writeFileSync(
    path.join(__dirname, "credentials.json"),
    JSON.stringify(credentials)
  );

  const child = fork(path.join(__dirname, "script.js"));

  // Listen for message from child process
  child.on("message", (msg) => {
    if (msg === "done") {
      event.sender.send("clear-fields");
    }
  });

  child.on("exit", () => {
    console.log("Script finished.");
  });
});

app.whenReady().then(createWindow);
