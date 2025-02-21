'use strict';

const { log } = console;

const os = document.querySelector('.os');
const language = document.querySelector('.language');
const browser = document.querySelector('.browser');
const width = document.querySelector('.width');
const height = document.querySelector('.height');
const screenOrientation = document.querySelector('.orientation');
const battLevel = document.querySelector('.level');
const battStatus = document.querySelector('.status');
const connection = document.querySelector('.connection');
const connectionText = document.querySelector('.connectionText');

function  getOS() {
    const os = navigator.userAgent;

    if (os.indexOf('Windows') !== -1) {
        return 'Windows';
    } else if (os.indexOf('Mac') !== -1) {
        return 'Mac';
    } else {
        return 'Other';
    }
}

function getLanguage() {
    return navigator.language;
}

// Function made partially with the help of chatGPT
function getBrowser() {
    let userAgent = navigator.userAgent;
  
    if (userAgent.indexOf('Chrome') > -1) {
        return 'Google Chrome';
    } else if (userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1) {
        return 'Safari';
    } else if (userAgent.indexOf('Firefox') > -1) {
        return 'Mozilla Firefox';
    } else if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident/') > -1) {
        return 'Internet Explorer';
    } else if (userAgent.indexOf('Edge') > -1) {
        return 'Microsoft Edge';
    } else {
        return 'other';
    }
}

function getWidth() {
    return window.innerWidth;
}

function getHeight() {
    return window.innerHeight;
}

// Got function from chatGPT
function getScreenOrientation() {
    const orientation = window.screen.orientation || window.screen.mozOrientation || window.screen.msOrientation;
    return orientation ? orientation.type : 'Unknown';
}

function getBatteryStatus() {
    if (getBrowser() === 'Safari' || getBrowser() === 'Mozilla Firefox') {
        battLevel.innerText = 'Level: unavailable';
        battStatus.innerText = 'Level: unavailable';
    }
    navigator.getBattery().then(function(battery) {
        battLevel.innerText = `Level: ${battery.level * 100}%`;
        battStatus.innerText = `Status: ${battery.charging ? 'Charging' : 'Not Charging'}`;
    });
}

function getConnectionStatus() {
    if (navigator.onLine) {
        connectionText.innerText = 'Online';
        connection.classList.add('online');
        connection.classList.remove('offline');
    } else {
        connectionText.innerText = 'Offline';
        connection.classList.add('offline');
        connection.classList.remove('online')
    }
}

window.addEventListener('load', function() {
    os.innerText = `OS: ${getOS()}`;
    language.innerText = `Language: ${getLanguage()}`;
    browser.innerText = `Browser: ${getBrowser()}`;
    width.innerText = `Width: ${getWidth()}`;
    height.innerText = `Height: ${getHeight()}`;
    screenOrientation.innerText = `Orientation: ${getScreenOrientation()}`;
    getBatteryStatus();
    getConnectionStatus();
});

window.addEventListener('resize', function() {
    width.innerText = `Width: ${getWidth()}`;
    height.innerText = `height: ${getHeight()}`;
});