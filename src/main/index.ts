import 'reflect-metadata';
import { app } from 'electron';
import { createWindow } from './main';
import '../shared/database/connection';

app.whenReady()
  .then(createWindow);