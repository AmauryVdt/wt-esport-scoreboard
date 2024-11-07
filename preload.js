const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    saveResults: (data) => ipcRenderer.send('save-results', data),
    onSwitchActivateFunction: (callback) => ipcRenderer.on('switch-function', callback),
    onIncreaseTeam1ActivateFunction: (callback) => ipcRenderer.on('increase-team1-function', callback),
    onDecreaseTeam1ActivateFunction: (callback) => ipcRenderer.on('decrease-team1-function', callback),
    onIncreaseTeam2ActivateFunction: (callback) => ipcRenderer.on('increase-team2-function', callback),
    onDecreaseTeam2ActivateFunction: (callback) => ipcRenderer.on('decrease-team2-function', callback),
});

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})