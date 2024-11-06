const { app, BrowserWindow, ipcMain } = require('electron')
const { updateElectronApp } = require('update-electron-app');

const path = require('node:path')
const fs = require('fs');

// Cahnger la sourcre des fichiers de score dans le script

// updateElectronApp();

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 400,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      // contextIsolation: true,
      // enableRemoteModule: false,
      // nodeIntegration: false,
    },
    autoHideMenuBar: true,
    icon: "assets/wt_esport_logo.png",
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// Reset toutes les données après avoir "Submit" les résultats
// try {
//   require('electron-reloader')(module)
// } catch (_) {}

ipcMain.on('save-results', (event, data) => {
  const writefile = (info) => { 
    fs.writeFile(info.filename, info.data, (err) => {
      if (err) {
        console.error('Failed to save file:', err);
      } else {
        console.log('Results saved successfully.');
      }
    });
  }

  for (const key in data) {
    writefile({filename: `${key}.txt`, data: data[key]});
  }
});