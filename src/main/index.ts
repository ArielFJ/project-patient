import 'reflect-metadata';
import { app } from 'electron';
import { createWindow } from './main';
import '../shared/database/connection';
// import '../shared/database/services/Patient/ipcHandler';

app.whenReady()
  .then(createWindow);