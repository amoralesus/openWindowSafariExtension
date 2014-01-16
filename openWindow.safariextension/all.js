


if (window === window.top && window.name.indexOf('extensionWindow') === -1) {

  var handleMessage = function(msg) {
    switch (msg.name) {

      case 'YouAreTheExtensionWindow': {
        window.name = 'extensionWindow';
        window.location.reload();
        break;
      }

      case 'PassMeYourInfo': {
        var info = {
          windowX: window.screenX,
          windowY: window.screenY,
          windowWidth: window.outerWidth,
          screenWidth: screen.availWidth
        };
        safari.self.tab.dispatchMessage('HeresMyInfo', info);
        break;
      }

      case 'OpenExtensionWindow': {
        window.open(msg.message.url,'extensionWindow', msg.message.attributes).focus();
        break;
      }
    }
  };

  safari.self.addEventListener('message', handleMessage, false);
}
