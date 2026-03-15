const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow () {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // optional, for future secure features
      contextIsolation: false, // allow your JS in HTML to access browser APIs
      nodeIntegration: true     // allows using Node features in renderer if needed
    },
    icon: path.join(__dirname, 'favicon.ico')
  });

  win.maximize();      // fullscreen
  win.loadFile('https://kceeandre.github.io/Landmarkcbt/'); // start with main page
  win.setMenu(null);   // hide menu bar
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});