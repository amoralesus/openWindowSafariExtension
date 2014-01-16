

var openOrFocusExtensionWindow = function(info) {

  if (extensionWindow && extensionWindow.page) {
    extensionWindow.browserWindow.activate();
  }
  else {
    var ml = info.windowX;
    var mr = info.screenWidth - info.windowWidth - info.windowX;

    if (extensionWinPos === null) {
      if (mr < extensionWinSize.x && ml >= extensionWinSize.x + 10)
        var left = ml - extensionWinSize.x + 10;
      else
        var left = info.windowX + info.windowWidth + 10;
      var top = info.windowY + 100;
    } else {
      var left = extensionWinPos.x;
      var top = extensionWinPos.y;
    }

    var attributes  = 'resizable=yes';
    attributes += ',width=' + extensionWinSize.x;
    attributes += ',height=' + extensionWinSize.y;
    attributes += ',left=' + left;
    attributes += ',top=' + top;

    var params = {
      url: extensionUrl,
      attributes: attributes
    };
    safari.application.activeBrowserWindow.activeTab.page.dispatchMessage('OpenExtensionWindow', params);
  }
}


var handleMessage = function(msg) {
  switch (msg.name) {
    case 'HeresMyInfo': {
      openOrFocusExtensionWindow(msg.message);
      break;
    }

    case 'HereIsTheExtensionWindow!': {
      extensionWindow = msg.target;
      var wl = msg.message;
      if (wl.href === 'about:blank') {
        var values = {
          width  : npWinSize.x,
          height : npWinSize.y,
          left   : npWin.position.left,
          top    : npWin.position.top
        };
        msg.target.page.dispatchMessage('ResizeYourself', values);
        msg.target.url = extensionUrl;
      }
      break;
    }


  };
};


var handleCommand = function(event) {

  switch (event.command) {
    case 'openExtensionWindow': {
      var srcWin = event.target.browserWindow;
      srcWin.activeTab.page.dispatchMessage('PassMeYourInfo');
      break;
    }
  }
};

var extensionWinSize = { x: 320, y: 480 };
var extensionWinPos = null;
var extensionWindow = null;
var extensionUrl = "http://amorales.us"

safari.application.addEventListener("message", handleMessage, false);
safari.application.addEventListener("command", handleCommand, false);