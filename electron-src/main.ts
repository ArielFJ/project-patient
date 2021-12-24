import { BrowserWindow, app } from 'electron';

let mainWindow: BrowserWindow | null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800, height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  console.log("What's up!!!");

  mainWindow.loadURL('http://localhost:3000');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady()
  .then(createWindow)