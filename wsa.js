var WSA;
(function (WSA) {
    class Canvas {
        constructor() {
            this.canvas = this.createCanvas();
        }
        init(body) {
            body.appendChild(this.canvas);
        }
        getCanvas() {
            return this.canvas;
        }
        getContext() {
            return this.canvas.getContext('2d');
        }
        clear() {
            this.getContext().clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
        createCanvas() {
            return document.createElement("canvas");
        }
    }
    WSA.Canvas = Canvas;
})(WSA || (WSA = {}));
var WSA;
(function (WSA) {
    //WASD input
    let keyMap;
    (function (keyMap) {
        keyMap[keyMap["right"] = 68] = "right";
        keyMap[keyMap["left"] = 65] = "left";
        keyMap[keyMap["up"] = 87] = "up";
        keyMap[keyMap["down"] = 83] = "down";
    })(keyMap || (keyMap = {}));
    class Keyboard {
        constructor() {
            this.keydown = (event) => {
                var key = keyMap[event.keyCode];
                this.pressedKeys[key] = true;
            };
            this.keyup = (event) => {
                var key = keyMap[event.keyCode];
                this.pressedKeys[key] = false;
            };
            this.pressedKeys = {
                left: false,
                right: false,
                up: false,
                down: false
            };
        }
        init() {
            window.addEventListener("keydown", this.keydown, false);
            window.addEventListener("keyup", this.keyup, false);
        }
        getKeys() {
            return this.pressedKeys;
        }
    }
    WSA.Keyboard = Keyboard;
})(WSA || (WSA = {}));
var WSA;
(function (WSA) {
    class Driver {
        constructor(canvas) {
            this.engine = new WSA.Engine(canvas);
            this.engine.start();
        }
        registerEntity(entity) {
            this.engine.registerEntity(entity);
        }
    }
    WSA.Driver = Driver;
})(WSA || (WSA = {}));
var WSA;
(function (WSA) {
    class Engine {
        constructor(canvas) {
            this.canvas = canvas;
            this.lastRender = 0;
            this.progress = 0;
            this.loop = (timestamp) => {
                this.progress = (timestamp - this.lastRender) / 16;
                this.update();
                this.eraseCanvas();
                this.draw();
                this.lastRender = timestamp;
                window.requestAnimationFrame(this.loop);
            };
            this.entities = [];
        }
        start() {
            window.requestAnimationFrame(this.loop);
        }
        update() {
            this.entities.forEach(entity => {
                entity.update(this.progress);
            });
        }
        draw() {
            this.entities.forEach(entity => {
                entity.draw();
            });
        }
        registerEntity(entity) {
            this.entities.push(entity);
        }
        eraseCanvas() {
            this.canvas.clear();
        }
    }
    WSA.Engine = Engine;
})(WSA || (WSA = {}));
var WSA;
(function (WSA) {
    class Entity {
    }
    WSA.Entity = Entity;
})(WSA || (WSA = {}));
var WSA;
(function (WSA) {
    class Player extends WSA.Entity {
        constructor(controller, ctx, construct) {
            super();
            this.controller = controller;
            this.velocity = 5;
            this.shape = new WSA.Rect(ctx, construct);
            this.controller.init();
        }
        draw() {
            this.shape.draw();
        }
        update(progress) {
            let pressedKeys = this.controller.getKeys();
            this.updateShape(pressedKeys, progress);
        }
        updateShape(pressedKeys, progress) {
            let p = progress * this.velocity;
            if (pressedKeys.down) {
                this.shape.y += p;
            }
            else if (pressedKeys.up) {
                this.shape.y -= p;
            }
            if (pressedKeys.right) {
                this.shape.x += p;
            }
            else if (pressedKeys.left) {
                this.shape.x -= p;
            }
        }
    }
    WSA.Player = Player;
})(WSA || (WSA = {}));
var WSA;
(function (WSA) {
    class Game {
        constructor(body) {
            this.canvas = new WSA.Canvas();
            this.driver = new WSA.Driver(this.canvas);
            this.canvas.init(body);
            this.init();
        }
        init() {
            let player = this.createPlayer();
            this.driver.registerEntity(player);
        }
        createPlayer() {
            let playerConstruct = {
                x: 0,
                y: 0,
                width: 20,
                height: 20,
                fillStyle: "red"
            };
            return new WSA.Player(new WSA.Keyboard(), this.canvas.getContext(), playerConstruct);
        }
    }
    WSA.Game = Game;
})(WSA || (WSA = {}));
document.addEventListener("DOMContentLoaded", function () {
    let body = document.getElementsByTagName("body").item(0);
    new WSA.Game(body);
});
var WSA;
(function (WSA) {
    class Rect {
        constructor(ctx, construct) {
            this.ctx = ctx;
            this.x = construct.x;
            this.y = construct.y;
            this.width = construct.width;
            this.height = construct.height;
            this.fillStyle = construct.fillStyle;
            this.lineWidth = construct.lineWidth;
            this.strokeStyle = construct.strokeStyle;
        }
        draw() {
            this.ctx.beginPath();
            this.ctx.rect(this.x, this.y, this.width, this.height);
            if (this.fillStyle) {
                this.ctx.fillStyle = this.fillStyle;
                this.ctx.fill();
            }
            if (this.lineWidth || this.strokeStyle) {
                if (this.lineWidth)
                    this.ctx.lineWidth = this.lineWidth;
                if (this.strokeStyle)
                    this.ctx.strokeStyle = this.strokeStyle;
                this.ctx.stroke();
            }
        }
    }
    WSA.Rect = Rect;
})(WSA || (WSA = {}));
//# sourceMappingURL=wsa.js.map