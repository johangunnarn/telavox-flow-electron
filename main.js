const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');
const os = require('os');

const credsPath = path.join(os.homedir(), '.config', 'flow-electron', 'credentials');

let USERNAME = '';
let PASSWORD = '';

const raw = fs.readFileSync(credsPath, 'utf-8');
const lines = raw.split('\n');

try {
  const raw = fs.readFileSync(credsPath, 'utf-8');
  const lines = raw.split('\n');
  lines.forEach(line => {
    const [key, ...rest] = line.split('=');
    const value = rest.join('=').trim();
    if (key === 'USERNAME') USERNAME = value;
    if (key === 'PASSWORD') PASSWORD = value;
  });
} catch (err) {
  console.error('Could not read credentials file:', err);
}

app.disableHardwareAcceleration();

function createWindow () {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    autoHideMenuBar: true,
    icon: path.join(__dirname, 'flow.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true,
      partition: 'persist:main'
    }
  });

  win.webContents.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
    '(KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
  );

  win.loadURL('https://app.joinflow.com/');

  win.webContents.on('did-finish-load', async () => {
    await win.webContents.executeJavaScript(`
      (function () {
        function typeLikeUser(el, value) {
          el.focus();
          el.value = '';
          for (let i = 0; i < value.length; i++) {
            el.value += value[i];
            el.dispatchEvent(new Event('input', { bubbles: true }));
          }
          el.dispatchEvent(new Event('change', { bubbles: true }));
        }

        function tryLogin() {
          const usernameEl = document.querySelector('#username');
          const passwordEl = document.querySelector('#password');
          const loginButton = document.querySelector('button[data-ng-click^="ctrl.signIn"]');

          if (usernameEl && passwordEl && loginButton) {
            if (usernameEl.value || passwordEl.value) return;

            typeLikeUser(usernameEl, "${USERNAME}");
            typeLikeUser(passwordEl, "${PASSWORD}");
            loginButton.click();

            console.log("Auto-login attempted via Angular function");
          } else {
            setTimeout(tryLogin, 500);
          }
        }

        setTimeout(tryLogin, 500);
      })();
    `);
  });
}

app.whenReady().then(createWindow);
