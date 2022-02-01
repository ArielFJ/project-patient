import Channels from '../shared/ipcChannels';
import { dialog, ipcMain, BrowserWindow } from 'electron';

const initDialogIpc = (window: BrowserWindow) => { 
  // ipcMain.handle(Channels.dialog.message, (event, message: string) => {
  //   return dialog.showMessageBox(window, {
  //     message
  //   });
  // });  

  ipcMain.handle(Channels.dialog.message, (event, options: Electron.MessageBoxOptions) => {
    return dialog.showMessageBox(window, options);
  });
}

export default initDialogIpc;