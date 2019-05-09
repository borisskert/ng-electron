import { app, BrowserWindow, screen } from 'electron';
import * as path from 'path';
import * as url from 'url';

const { autoUpdater } = require('electron-updater');
const log = require('electron-log');

class AppUpdater {
  constructor(private readonly sendStatusToWindow: (text: string) => void) {}

  public init(): void {
    log.transports.file.level = 'debug';
    autoUpdater.logger = log;

    autoUpdater.on('checking-for-update', () => {
      this.sendStatusToWindow('Checking for update...');
    });

    autoUpdater.on('update-available', (info) => {
      this.sendStatusToWindow('Update available.');
    });

    autoUpdater.on('update-not-available', (info) => {
      this.sendStatusToWindow('Update not available.');
    });

    autoUpdater.on('error', (err) => {
      this.sendStatusToWindow('Error in auto-updater. ' + err);
    });

    autoUpdater.on('download-progress', (progressObj) => {
      let logMessage = 'Download speed: ' + progressObj.bytesPerSecond;
      logMessage = logMessage + ' - Downloaded ' + progressObj.percent + '%';
      logMessage = logMessage + ' (' + progressObj.transferred + '/' + progressObj.total + ')';
      this.sendStatusToWindow(logMessage);
    });

    autoUpdater.on('update-downloaded', (info) => {
      this.sendStatusToWindow('Update downloaded');
    });

    autoUpdater.checkForUpdatesAndNotify();
  }
}

(() => {
  let browserWindow;

  function createWindow() {
    const args = process.argv.slice(1);
    const serve = args.some(val => val === '--serve');
    const size = screen.getPrimaryDisplay().workAreaSize;

    browserWindow = new BrowserWindow({
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
      browserWindow.loadURL('http://localhost:4200');
    } else {
      browserWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'dist/index.html'),
        protocol: 'file:',
        slashes: true
      }));
    }

    if (serve) {
      browserWindow.webContents.openDevTools();
    }

    // Emitted when the window is closed.
    browserWindow.on('closed', () => {
      // Dereference the window object, usually you would store window
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      browserWindow = null;
    });
  }

  function sendStatusToWindow(text) {
    log.info(text);

    if (browserWindow && browserWindow.webContents) {
      browserWindow.webContents.send('message', text);
    }
  }

  const appUpdater = new AppUpdater(sendStatusToWindow);

  try {
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    app.on('ready', () => {
      createWindow();
      appUpdater.init();
    });

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
      if (browserWindow === null) {
        createWindow();
      }
    });
  } catch (e) {
    log.info('Fatal error occured while starting app:', e);
    throw e;
  }
})();
