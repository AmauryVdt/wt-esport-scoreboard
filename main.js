const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron')

const path = require('node:path')
const fs = require('fs');

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

function addGlobalShortcut (shortcut, functionName) {
  globalShortcut.register(shortcut, () => {    
    const activeWindow = BrowserWindow.getFocusedWindow() || BrowserWindow.getAllWindows()[0];

    if (activeWindow) {
        activeWindow.webContents.send(functionName);
    } else {
        console.log('No active window to receive the shortcut event.');
    }
  });
}

app.whenReady().then(() => {
  createWindow()

  addGlobalShortcut('Ctrl+Shift+F', 'switch-function');
  addGlobalShortcut('Ctrl+Shift+1', 'increase-team1-function');
  addGlobalShortcut('Ctrl+Alt+1', 'decrease-team1-function');
  addGlobalShortcut('Ctrl+Shift+2', 'increase-team2-function');
  addGlobalShortcut('Ctrl+Alt+2', 'decrease-team2-function');
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

// Reset toutes les données après avoir "Submit" les résultats
try {
  require('electron-reloader')(module)
} catch (_) {}

ipcMain.on('save-results', (event, data) => {
  const dirPath = 'C:/wt-esport-scoreboard';

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log("Folder created:", dirPath);
  }

  const writefile = (info) => { 
    fs.writeFile(`${dirPath}/${info.filename}`, info.data, (err) => {
      if (err)
        console.error('Failed to save file:', err);
      // else
      //   console.log('Results saved successfully.');
    });
  }

  for (const key in data) {
    writefile({filename: `${key}.txt`, data: data[key]});
  }
});