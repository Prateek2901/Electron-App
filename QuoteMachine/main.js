'use strict';

var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var mainWindow = null;

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        resizable: false,
        frame: false,
        height: 600,
        width: 800,
        'node-integration': false
    });

    mainWindow.loadURL('file://' + __dirname + '/app/index.html');

    mainWindow.on('closed', function() {
        app.quit();
    });

});