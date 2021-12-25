import { BrowserWindow, app, dialog } from 'electron';
import windowStateKeeper from 'electron-window-state';
import isDevEnvironment from 'electron-is-dev';
import path from 'path';

let mainWindow: BrowserWindow | null;

export const createWindow = () => {
  const state = windowStateKeeper({
    defaultWidth: 800,
    defaultHeight: 600
  });

  mainWindow = new BrowserWindow({
    width: state.width,
    height: state.height,
    x: state.x,
    y: state.y,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    show: false,
    backgroundColor: '#e3f2fd'
  });

  if (isDevEnvironment) {
    mainWindow.loadURL('http://localhost:3000');
  } else {
    // Load HTML built file
    mainWindow.loadFile(path.join(__dirname, '../build/index.html'))
  }

  // Show the window when contents are loaded
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow!.show();
  })

  mainWindow.webContents.on('crashed', () => {
    // TODO: handle crashes
    mainWindow = null;
    app.quit();
  })

  // Manage main window state
  state.manage(mainWindow);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow();
});