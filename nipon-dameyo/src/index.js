const { app, BrowserWindow, ipcMain } = require('electron');
const os = require('os-utils');
const path = require('node:path');

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    minWidth: 1280,
    minHeight: 720,
    icon: path.join(__dirname, 'Asset/Icon/pc-app.png'),
    fullscreen: true,
    autoHideMenuBar: true,
    backgroundColor: "#000000",
    show: false,
    center: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },

  });

  mainWindow.loadFile(path.join(__dirname, 'splash.html'));

  setInterval(() => {
    os.cpuUsage((cpuUsage) => {
      const freeMem = os.freemem();
      const totalMem = os.totalmem();
      const usedMem = totalMem - freeMem;
      const memUsage = usedMem / totalMem;
      const usedMemGiB = usedMem / 1024;
      const totalMemGiB = totalMem / 1024;

      mainWindow.webContents.send('usage-data', {
        cpuUsage: cpuUsage * 100,
        memUsage: memUsage * 100,
        usedMemGiB: usedMemGiB,
        totalMemGiB: totalMemGiB
      });
    });
  }, 500);

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('app-quit', () => {
  app.quit();
});