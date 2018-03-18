declare var Game;
document.addEventListener("DOMContentLoaded", function() { 
    let body = document.getElementsByTagName("body").item(0);
    let width = body.clientWidth,
        height = Math.floor(body.clientHeight / 32) * 32;
    window.game = new WSA.Game(body,{w:width, h: height});
    window.game.init();
  });
  