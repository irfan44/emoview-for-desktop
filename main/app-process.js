const { BrowserWindow } = require("electron");
const path = require("path");

function createAppWindow() {
  let win = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    icon: path.join(__dirname, "./static/icon.png"),
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: "#f1f2f6",
    },
    width: 1200,
    height: 800,
    autoHideMenuBar: true,
  });

  win.loadURL("https://emoview-v2.vercel.app");

  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https://")) shell.openExternal(url);
    return { action: "deny" };
  });

  win.webContents.on("did-fail-load", () => {
    win.loadURL("https://emoview-v2.vercel.app");
  });

  win.on("closed", () => {
    win = null;
  });
}

module.exports = createAppWindow;
