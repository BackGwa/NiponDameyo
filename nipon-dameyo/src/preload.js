const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    quitApp: () => ipcRenderer.send('app-quit')
});

contextBridge.exposeInMainWorld('api', {
    onUsageData: (callback) => ipcRenderer.on('usage-data', callback)
});