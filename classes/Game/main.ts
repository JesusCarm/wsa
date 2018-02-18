document.addEventListener("DOMContentLoaded", function() { 
    let body = document.getElementsByTagName("body").item(0);
    let width = body.clientWidth,
        height = body.clientHeight;
    new WSA.Platform.PlatformGame(body,{w:width, h: height});
  });
  