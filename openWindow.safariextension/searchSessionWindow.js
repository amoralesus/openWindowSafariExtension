


if (window.name.indexOf('extensionWindow') === 0) {

  var handleMessage = function(msg) {
    switch (msg.name) {
      case 'ResizeYourself': {
        window.resizeTo(msg.message.width,msg.message.height);
        window.moveTo(msg.message.left,msg.message.top);
        break;
      }
    }
  };


  safari.self.addEventListener('message', handleMessage, false);
  safari.self.tab.dispatchMessage('HereIsTheExtensionWindow!', window.location);

}
