const { app, BrowserWindow } = require('electron');

function createWindow () {
    var isPi = require('detect-rpi');
    const win = new BrowserWindow({
        width: 800,
        height: 480,
        webPreferences: {
            nodeIntegration: true
        },
        kiosk: isPi(),
        frame: !(isPi())
    })
    win.loadFile('templates/index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
