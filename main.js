// Modules to control application life and create native browser window
const { app, BrowserWindow } = require("electron");
const path = require("path");
const Usb = require("escpos-usb");

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    // width: 800,
    // height: 600,
    fullscreen: true,
    // frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });

  // and load remote site.
  mainWindow.loadURL("https://s.mini-mars.com");

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.allowRendererProcessReuse = false;
app
  .whenReady()
  .then(createWindow)
  .then(async function () {
    const device = new Usb();
    device.open(function (error) {
      device.write("\x1Bia\x03"); // switch mode
      device.write("^II");
      device.write("^ONdata1\x00");
      device.write("^DI\x0B\x00136****6334");
      device.write("^ONdata2\x00");
      device.write("^DI\x10\x002020-04-24 00:00");
      device.write("^ONqr\x00");
      device.write("^DI\x0B\x00136****6334");
      device.write("^ID");
      device.write("^FF");
    });
  });

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
