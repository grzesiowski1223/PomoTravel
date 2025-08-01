const { app, BrowserWindow, Notification, ipcMain, nativeTheme } = require('electron');
const path = require('node:path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js') // Upewnij się, że plik istnieje
    }
  });

  win.loadFile('index.html');
}

const NOTIFICATION_TITLE = 'Test';
const NOTIFICATION_BODY = 'Notification Test';

function showNotification() {
  const notification = new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY });
  notification.show();
  console.log("Notification Sent.");
}

ipcMain.handle('notification-clock', () => {
  const NOTIFICATION_TITLE = 'Title'
  const NOTIFICATION_BODY = 'Notification from the Renderer process. Click to log to console.'
  const CLICK_MESSAGE = 'Notification clicked'

  new Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY }).onclick =
  () => console.log(CLICK_MESSAGE)
})

app.whenReady().then(() => {
  createWindow();
  showNotification();
});

ipcMain.handle('dark-mode:toggle', () => {
  if (nativeTheme.shouldUseDarkColors) {
    nativeTheme.themeSource = 'light';
  } else {
    nativeTheme.themeSource = 'dark';
  }
  return nativeTheme.shouldUseDarkColors;
});

ipcMain.handle('dark-mode:system', () => {
  nativeTheme.themeSource = 'system';
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
