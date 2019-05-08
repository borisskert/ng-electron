import { app, BrowserWindow, screen } from 'electron';
import * as path from 'path';
import * as url from 'url';

(() => {
  let window;

  function createWindow() {
    const args = process.argv.slice(1);
    const serve = args.some(val => val === '--serve');
    const size = screen.getPrimaryDisplay().workAreaSize;

    window = new BrowserWindow({
      x: 0,
      y: 0,
      width: size.width,
      height: size.height,
      webPreferences: {
        nodeIntegration: true,
      },
    });

    if (serve) {
      require('electron-reload')(__dirname, {
        electron: require(`${__dirname}/node_modules/electron`)
      });
      window.loadURL('http://localhost:4200');
    } else {
      window.loadURL(url.format({
        pathname: path.join(__dirname, 'dist/index.html'),
        protocol: 'file:',
        slashes: true
      }));
    }

    if (serve) {
      window.webContents.openDevTools();
    }

    // Emitted when the window is closed.
    window.on('closed', () => {
      // Dereference the window object, usually you would store window
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      window = null;
    });
  }

  try {
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    app.on('ready', createWindow);

    // Quit when all windows are closed.
    app.on('window-all-closed', () => {
      // On OS X it is common for applications and their menu bar
      // to stay active until the user quits explicitly with Cmd + Q
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    app.on('activate', () => {
      // On OS X it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (window === null) {
        createWindow();
      }
    });
  } catch (e) {
    console.log('Should never ever happen:', e);
    throw e;
  }
})();
