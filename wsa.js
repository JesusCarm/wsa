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
    class Entity {
        constructor() {
            this.hasRigidBody = false;
        }
        get id() {
            return this._id;
        }
        set id(id) {
            this._id = id;
        }
    }
    WSA.Entity = Entity;
})(WSA || (WSA = {}));
/// <reference path="../entities/Entity" />
var WSA;
(function (WSA) {
    class RigidEntity {
        constructor(_rigidBody) {
            this._rigidBody = _rigidBody;
            this.hasRigidBody = true;
        }
        get rigidBody() {
            return this._rigidBody;
        }
        set rigidBody(rigidBody) {
            this._rigidBody = rigidBody;
        }
        get bounds() {
            return this._bounds;
        }
        set bounds(bounds) {
            this._bounds = bounds;
        }
    }
    WSA.RigidEntity = RigidEntity;
})(WSA || (WSA = {}));
/// <reference path="../entities/RigidEntity" />
var WSA;
(function (WSA) {
    class CollisionResolver {
        checkCollisions(entities) {
            entities.forEach((entity, _i, entities) => {
                if (entity.hasRigidBody)
                    this.checkCollision(entity.id, entity.rigidBody, entities);
            });
        }
        checkCollision(current, rigidBody, entities) {
            entities.forEach((entity, _i) => {
                if (!entity.hasRigidBody || current === entity.id)
                    return;
                let targetRigidBody = entity.rigidBody;
                if (!rigidBody.colliders.some((collider) => collider === targetRigidBody.bodyType))
                    return;
                this.collisionChecker(rigidBody.bounds, targetRigidBody.bounds);
            });
        }
        collisionChecker(bounds, targetBounds) {
            if (bounds.l > targetBounds.r || bounds.r < targetBounds.l || bounds.t > targetBounds.b || bounds.b < targetBounds.t)
                return;
            console.log("collision");
        }
    }
    WSA.CollisionResolver = CollisionResolver;
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
/// <reference path="../canvas/Canvas.ts" />
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
                this.resolveCollisions();
                this.lastRender = timestamp;
                window.requestAnimationFrame(this.loop);
            };
            this.idCounter = 0;
            this.entities = [];
            this.collisionResolver = new WSA.CollisionResolver();
        }
        start() {
            window.requestAnimationFrame(this.loop);
        }
        update() {
            this.entities.forEach(entity => {
                entity.update(this.progress);
            });
        }
        resolveCollisions() {
            this.collisionResolver.checkCollisions(this.entities);
        }
        draw() {
            this.entities.forEach(entity => {
                entity.draw();
            });
        }
        registerEntity(entity) {
            entity.id = this.idCounter++;
            this.entities.push(entity);
        }
        eraseCanvas() {
            this.canvas.clear();
        }
    }
    WSA.Engine = Engine;
})(WSA || (WSA = {}));
/// <reference path="../controllers/Keyboard" />
var WSA;
(function (WSA) {
    class Box extends WSA.RigidEntity {
        constructor(ctx, construct, rigidBody) {
            super(rigidBody);
            this.hasRigidBody = true;
            this.shape = new WSA.Rect(ctx, construct);
            this.updateRigidBody();
        }
        draw() {
            this.shape.draw();
        }
        update(progress) {
            progress;
            //this.updateRigidBody();
        }
        updateRigidBody() {
            this.rigidBody.bounds = {
                l: this.shape.x,
                r: this.shape.x + this.shape.width,
                t: this.shape.y,
                b: this.shape.y + this.shape.height
            };
        }
    }
    WSA.Box = Box;
})(WSA || (WSA = {}));
/// <reference path="../controllers/Keyboard" />
var WSA;
(function (WSA) {
    class Player extends WSA.RigidEntity {
        constructor(controller, ctx, construct, rigidBody) {
            super(rigidBody);
            this.controller = controller;
            this.hasRigidBody = true;
            this.velocity = 5;
            this.shape = new WSA.Rect(ctx, construct);
            this.controller.init();
        }
        draw() {
            this.shape.draw();
        }
        update(progress) {
            let pressedKeys = this.controller.getKeys();
            this.updateShapePosition(pressedKeys, progress);
            this.updateRigidBody();
        }
        updateShapePosition(pressedKeys, progress) {
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
        updateRigidBody() {
            this.rigidBody.bounds = {
                l: this.shape.x,
                r: this.shape.x + this.shape.width,
                t: this.shape.y,
                b: this.shape.y + this.shape.height
            };
        }
    }
    WSA.Player = Player;
})(WSA || (WSA = {}));
var WSA;
(function (WSA) {
    let rigidBodyType;
    (function (rigidBodyType) {
        rigidBodyType[rigidBodyType["wall"] = 0] = "wall";
        rigidBodyType[rigidBodyType["entity"] = 1] = "entity";
    })(rigidBodyType = WSA.rigidBodyType || (WSA.rigidBodyType = {}));
    class RigidBody {
        constructor(_bodyType, _colliders) {
            this._bodyType = _bodyType;
            this._colliders = _colliders;
        }
        get bodyType() {
            return this._bodyType;
        }
        set bodyType(bodyType) {
            this._bodyType = bodyType;
        }
        get colliders() {
            return this._colliders;
        }
        set colliders(colliders) {
            this._colliders = colliders;
        }
        get bounds() {
            return this._bounds;
        }
        set bounds(bounds) {
            this._bounds = bounds;
        }
    }
    WSA.RigidBody = RigidBody;
})(WSA || (WSA = {}));
/// <reference path="../engine/Driver.ts" />
/// <reference path="../rigidBody/RigidBody.ts" />
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
            let box = this.createBox();
            this.driver.registerEntity(box);
        }
        createPlayer() {
            let playerConstruct = {
                x: 0,
                y: 0,
                width: 20,
                height: 20,
                fillStyle: "red"
            };
            let playerBody = new WSA.RigidBody(WSA.rigidBodyType.entity, [WSA.rigidBodyType.entity, WSA.rigidBodyType.wall]);
            return new WSA.Player(new WSA.Keyboard(), this.canvas.getContext(), playerConstruct, playerBody);
        }
        createBox() {
            let boxConstruct = {
                x: 50,
                y: 50,
                width: 20,
                height: 20,
                fillStyle: "blue"
            };
            let boxBody = new WSA.RigidBody(WSA.rigidBodyType.entity, []);
            return new WSA.Box(this.canvas.getContext(), boxConstruct, boxBody);
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