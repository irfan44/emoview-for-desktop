const { app, ipcMain, BrowserWindow, screen } = require("electron");

const { createAuthWindow, createLogoutWindow } = require("./main/auth-process");
const createAppWindow = require("./main/app-process");
const createFloatingWindow = require("./main/floating-window-process");
const authService = require("./services/auth-service");

if (require("electron-squirrel-startup")) app.quit();

async function showWindow() {
  try {
    await authService.refreshTokens();
    createAppWindow();
  } catch (err) {
    createAuthWindow();
  }
}

app.on("ready", () => {
  ipcMain.handle("auth:get-accessToken", authService.getAccessToken);
  ipcMain.handle("auth:get-profile", authService.getProfile);
  ipcMain.on("auth:log-out", () => {
    BrowserWindow.getAllWindows().forEach((window) => window.close());
    createLogoutWindow();
  });

  const primaryDisplay = screen.getPrimaryDisplay();
  const { width } = primaryDisplay.workAreaSize;
  ipcMain.on("floating:open", (_, ...args) => {
    createFloatingWindow(width, ...args);
  });
  ipcMain.on("floating:close", () => {
    BrowserWindow.getFocusedWindow().close();
  });

  showWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("second-instance", () => {
  if (win) {
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});
