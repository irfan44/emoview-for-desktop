const { contextBridge, ipcRenderer } = require("electron");

const electronAPI = {
  getAccessToken: () => ipcRenderer.invoke("auth:get-accessToken"),
  getProfile: () => ipcRenderer.invoke("auth:get-profile"),
  logOut: () => ipcRenderer.send("auth:log-out"),
  getPrivateData: () => ipcRenderer.invoke("api:get-private-data"),
  openFloating: (id, accessToken) =>
    ipcRenderer.send("floating:open", id, accessToken),
  closeFloating: () => ipcRenderer.send("floating:close"),
};

process.once("loaded", () => {
  contextBridge.exposeInMainWorld("electronAPI", electronAPI);
});
