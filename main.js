
// Module to create native browser window.
var BrowserWindow = require('electron').BrowserWindow

var path = require('path')
var url = require('url')
var ipcMain = require('electron').ipcMain

class WindowsManager {
    constructor(win) {
      this.win = win
      this.args = null
      this.path = path

      this.webContents = this.win.webContents

      this.dir = __dirname
    }
    /*
    setURL : A Easier way of setting the url, allows for arguments to be pased
    @PATH = path of files
    @URL = file name, like index.html
    @<OPTARGS> = An optional argument for passing arguments in a new window (object)
    */
    setURL(path, url, optArgs = null) {
      var urlPath, args;
      args = this._setArgs(optArgs)
      if (url != null) {
          urlPath = `file://${path}/${url}${args}`
          this.win.loadURL(urlPath)
        }
    }
    _setArgs(object) {
      var s = `?id=${this.win.id}&`
      var i = 0
      for (var key in object) {
        if (object.hasOwnProperty(key)) {
         	s = s + key + "=" + object[key]
          if (i != (Object.keys(object).length - 1)) {
             	s = s + "&"
          }
        }
        i++
      }
      return s
    }
    //Improved BrowserWindow Functions
    openDevTools() {
      this.win.webContents.openDevTools()
    }
    getDir() {
      return this.dir
    }
}
var _windows = {}
var _manager = {}

var directory;

function buildWindow(pref) {
  var win = new BrowserWindow(pref)
  var manager = new WindowsManager(win)
  _windows[win.id] = win
  _manager[win.id] = manager
  return win
}
function createWindow(pref) {
  var window = buildWindow(pref);
  window.unref = _unref.bind(window)
  window.once('close', window.unref)
  return _manager[window.id]
}
function _unref() {
  delete _windows[this.id]
  delete _manager[this.id]
}
function _listWindows() {
  return _windows
}
function setDir(dir) {
  directory = dir
}
function getDir() {
  return directory;
}


module.exports = {
  buildWindow: buildWindow,
  createWindow: createWindow,
  setDir: setDir,
  getDir: getDir,
  _unref: _unref,
  _listWindows: _listWindows,
  // Classes
  WindowsManager: WindowsManager
}
