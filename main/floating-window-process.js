const { BrowserWindow } = require("electron");
const path = require("path");

function createFloatingWindow(width, id, accessToken) {
  let win = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    icon: path.join(__dirname, "./static/icon.png"),
    width: 256,
    height: 325,
    alwaysOnTop: true,
    focusable: true,
    frame: false,
    transparent: true,
    y: 48,
    x: width - 272,
    autoHideMenuBar: true,
  });

  win.loadURL(
    `https://emoview-v15.vercel.app/in-meeting-display?id=${id}&accessToken=${accessToken}`
  );

  win.on("closed", () => {
    win = null;
  });
}

module.exports = createFloatingWindow;
