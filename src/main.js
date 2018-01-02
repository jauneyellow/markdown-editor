const electron = require("electron");
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const app = electron.app;
const ipc = electron.ipcMain;
const dialog = electron.dialog;
const fs = require("fs");

let myAppMenu, menuTemplate;

app.on("ready", function() {
  let appWindow;
  appWindow = new BrowserWindow({
    show: false
  });

  appWindow.loadURL(`file://${__dirname}/index.html`);

  appWindow.once("ready-to-show", function() {
    appWindow.show();
  });

  menuTemplate = [
    {
      label: "File",
      submenu: [
        {
          label: "Open",
          accelerator: process.platform === "darwin" ? "Command+O" : "Ctrl+O",
          click() {
            const properties = ["createDirectory", "openFile"],
              parentWindow =
                process.platform == "darwin"
                  ? null
                  : BrowserWindow.getFocusedWindow();

            dialog.showOpenDialog(parentWindow, properties, file => {
              parentWindow.webContents.send("open-file", file[0]);
            });
          }
        },
        {
          role: "close"
        },
        {
          role: "quit"
        }
      ]
    },
    {
      label: "View",
      submenu: [
        {
          role: "reload"
        },
        {
          role: "toggledevtools"
        },
        {
          type: "separator"
        },
        {
          role: "resetzoom"
        },
        {
          role: "zoomin"
        },
        {
          role: "zoomout"
        },
        {
          type: "separator"
        },
        {
          role: "togglefullscreen"
        }
      ]
    },
    {
      label: "Edit",
      submenu: [
        {
          role: "undo"
        },
        {
          role: "redo"
        },
        {
          role: "cut"
        },
        {
          role: "copy"
        },
        {
          role: "paste"
        },
        {
          role: "selectall"
        }
      ]
    }
  ];

  myAppMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(myAppMenu);
});
