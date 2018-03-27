# import-window
Simple BrowserWindow manager for Electron
## Installing
NPM
```cmd
npm install import-window
```
## Using 

### Backend (main)
This is an example of creating a window in the backend, of course you need to import everything, and have the app events triggering it but here a basic overview
```js
//Import all modules needed (Electron, path, url, import-window, etc)
const importwin = require('import-window')
let mainWin; //Create a global varaible to store a import window in

//Create a new window, all properties stem from BrowserWindow. This should trigger in the app.active event
mainWin = importwin.createWindow({
    show: false,
    backgroundColor: '#420024',
    frame: false,
    resizable: true,
    maximizable: true,
    backgroundColor: 'gray',
    webPreferences: {
      zoomFactor: 0.9,
    }
  })
/**** ImportWindow Methods ****/
  /**
* .setURL (directory, file, arguments)
* directory - location of file
* file - file
* arguments - a list of arugments to pass to render
* {name: "Fred", type: "2"} NEVER USE 'id' as an argument, its used by default for window numbering
* 
*/
mainWin.setURL(__dirname, "explorer.html", {name: "Hello"})

//Use .win to access any BrowserWindow functions
mainWin.win.setFullScreenable(false)
mainWin.win.setResizable(false)
mainWin.win.setMinimumSize(800, 600);
mainWin.win.setMaximumSize(800, 600);
//Easier way to ope dev tools
  
mainWin.openDevTools();
  
//Events via the BrowserWindow
mainWin.win.once('ready-to-show', () => {
  mainWin.win.show()
})
  
//Sets the location of loading files to main directory
importwin.setDir(__dirname) //Import for opening windows in the Electron Render
```
  
## Frontend (arguments)
This will return arguments passed via the file (its based on get parameters, so there is a limit in theory)
```js
const managerLocal = require("import-window")
let args
if (managerLocal.hasArgs() {
  args = managerLocal.parseArgs()
  //args.name = Fred
  //args.type = 2
}
```
## Frontend (remote) 
This how to create a new window in the RENDER PROCESS. Only change from normal backend is `.getDir()` instead of `__dirname`
```js
const managerRemote = remote.require("import-window")
let mainWin = managerRemote.createWindow({
  show: false,
  width: 1000,
  height: 800,
  frame: false,
  color: "#000",
  webPreferences: {
    zoomFactor: 0.9,
  },
icon: path.join(managerRemote.getDir(), 'assets/icons/png/1024x1024.png')
})
//Intead of __dirname we used '.getDir()' 
mainWin.setURL(managerRemote.getDir(), "project.html", {
  serverIP: ip,
  sessionKey: sessionKey
})
mainWin.win.setMinimumSize(800, 700);
  mainWin.win.webContents.on('did-finish-load', () => {
  mainWin.win.show()
win.close();
})
 
 ```
 
