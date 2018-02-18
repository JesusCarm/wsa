var WSA;
(function (WSA) {
    class Canvas {
        constructor(size) {
            this.canvas = this.createCanvas(size);
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
        createCanvas(size) {
            let canvas = document.createElement("canvas");
            canvas.height = size.h;
            canvas.width = size.w;
            canvas.style.backgroundColor = "lightgrey";
            return canvas;
        }
    }
    WSA.Canvas = Canvas;
})(WSA || (WSA = {}));
var WSA;
(function (WSA) {
    class FullWidthCanvas extends WSA.Canvas {
    }
    WSA.FullWidthCanvas = FullWidthCanvas;
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
            this.oldState = {
                hasRigidBody: []
            };
        }
        get id() {
            return this._id;
        }
        set id(id) {
            this._id = id;
        }
        saveState() {
            this.oldState.hasRigidBody.push(this.hasRigidBody);
        }
        restoreState() {
            this.hasRigidBody = this.oldState.hasRigidBody.pop();
        }
    }
    WSA.Entity = Entity;
})(WSA || (WSA = {}));
var WSA;
(function (WSA) {
    let rigidBodyType;
    (function (rigidBodyType) {
        rigidBodyType[rigidBodyType["wall"] = 0] = "wall";
        rigidBodyType[rigidBodyType["entity"] = 1] = "entity";
        rigidBodyType[rigidBodyType["weapons"] = 2] = "weapons";
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
/// <reference path="../entities/Entity" />
/// <reference path="../rigidBody/RigidBody" />
var WSA;
(function (WSA) {
    class RigidEntity extends WSA.Entity {
        constructor(_rigidBody) {
            super();
            this._rigidBody = _rigidBody;
            this.hasRigidBody = true;
            this.oldState.bounds = [];
            this._targetColliders = null;
        }
        draw() {
            this.shape.draw();
        }
        get rigidBody() {
            return this._rigidBody;
        }
        set rigidBody(rigidBody) {
            this._rigidBody = rigidBody;
        }
        get targetCollider() {
            return this._targetColliders;
        }
        setTargetCollider(targetBody) {
            this.colliding = true;
            this._targetColliders = targetBody;
        }
        get colliding() {
            return this._colliding;
        }
        set colliding(colliding) {
            this._colliding = colliding;
        }
        saveState() {
            super.saveState();
            this.oldState.bounds.push(Object.assign({}, this.rigidBody.bounds));
        }
        restoreState() {
            super.restoreState();
            this.rigidBody.bounds = this.oldState.bounds.pop();
        }
        updateRigidBodyBounds(bounds) {
            this.rigidBody.bounds = bounds;
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
                    this.checkCollision(entity, entities);
            });
        }
        checkCollision(currentEntity, entities) {
            entities.forEach((targetEntity, _i) => {
                if (!targetEntity.hasRigidBody || currentEntity.id === targetEntity.id)
                    return;
                let targetRigidBody = targetEntity.rigidBody;
                if (!currentEntity.rigidBody.colliders.some((collider) => collider === targetRigidBody.bodyType))
                    return;
                if (this.collisionChecker(currentEntity.rigidBody.bounds, targetRigidBody.bounds)) {
                    currentEntity.setTargetCollider(targetEntity.rigidBody);
                    currentEntity.resolveCollision();
                }
            });
        }
        collisionChecker(bounds, targetBounds) {
            return !(bounds.l > targetBounds.r || bounds.r < targetBounds.l || bounds.t > targetBounds.b || bounds.b < targetBounds.t);
        }
    }
    WSA.CollisionResolver = CollisionResolver;
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
                this.resolveCollisions();
                this.draw();
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
            // this.entities.forEach((entity: IRigidEntity) => {
            //     entity.resolveCollision();
            // });
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
        registerForce(force) {
        }
        eraseCanvas() {
            this.canvas.clear();
        }
    }
    WSA.Engine = Engine;
})(WSA || (WSA = {}));
var WSA;
(function (WSA) {
    class World {
        constructor(canvas) {
            this.engine = new WSA.Engine(canvas);
            this.engine.start();
        }
        registerEntity(entity) {
            this.engine.registerEntity(entity);
        }
        registerForce(force) {
        }
    }
    WSA.World = World;
})(WSA || (WSA = {}));
/// <reference path="../controllers/Keyboard" />
var WSA;
(function (WSA) {
    class Box extends WSA.RigidEntity {
        constructor(ctx, construct, rigidBody) {
            super(rigidBody);
            this.hasRigidBody = true;
            this.shape = new WSA.Rect(ctx, construct);
        }
        draw() {
            this.shape.draw();
        }
        update(progress) {
            progress;
            this.updateRigidBodyBounds({
                l: this.shape.x,
                r: this.shape.x + this.shape.width,
                t: this.shape.y,
                b: this.shape.y + this.shape.height
            });
        }
        resolveCollision() {
        }
    }
    WSA.Box = Box;
})(WSA || (WSA = {}));
var WSA;
(function (WSA) {
    var Forces;
    (function (Forces) {
        class Gravity {
            constructor() {
                this.value = 9.8;
            }
        }
        Forces.Gravity = Gravity;
    })(Forces = WSA.Forces || (WSA.Forces = {}));
})(WSA || (WSA = {}));
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
/// <reference path="../Core/engine/World.ts" />
/// <reference path="../Core/rigidBody/RigidBody.ts" />
var WSA;
(function (WSA) {
    class Game {
        constructor(body, size) {
            this.canvas = new WSA.Canvas(size);
            this.world = new WSA.World(this.canvas);
            this.canvas.init(body);
            this.init();
        }
        init() {
            let player = this.createPlayer();
            this.world.registerEntity(player);
            let box = this.createBox();
            this.world.registerEntity(box);
            let weapon = this.createWeaponBox();
            this.world.registerEntity(weapon);
        }
        createPlayer() {
            let playerConstruct = {
                x: 0,
                y: 0,
                width: 20,
                height: 20,
                fillStyle: "green"
            };
            let playerBody = new WSA.RigidBody(WSA.rigidBodyType.entity, [WSA.rigidBodyType.weapons, WSA.rigidBodyType.wall]);
            return new WSA.Platform.Player(new WSA.Keyboard(), this.canvas.getContext(), playerConstruct, playerBody, 100);
        }
        createBox() {
            let boxConstruct = {
                x: 50,
                y: 50,
                width: 20,
                height: 20,
                fillStyle: "blue"
            };
            let boxBody = new WSA.RigidBody(WSA.rigidBodyType.wall, []);
            return new WSA.Box(this.canvas.getContext(), boxConstruct, boxBody);
        }
        createWeaponBox() {
            let boxConstruct = {
                x: 100,
                y: 100,
                width: 20,
                height: 20,
                fillStyle: "red"
            };
            let boxBody = new WSA.RigidBody(WSA.rigidBodyType.weapons, []);
            return new WSA.Box(this.canvas.getContext(), boxConstruct, boxBody);
        }
    }
    WSA.Game = Game;
})(WSA || (WSA = {}));
document.addEventListener("DOMContentLoaded", function () {
    let body = document.getElementsByTagName("body").item(0);
    let width = body.clientWidth, height = body.clientHeight;
    new WSA.Platform.PlatformGame(body, { w: width, h: height });
});
/// <reference path="../../Core/controllers/Keyboard" />
var WSA;
(function (WSA) {
    var Platform;
    (function (Platform) {
        class Player extends WSA.RigidEntity {
            constructor(controller, ctx, construct, rigidBody, life) {
                super(rigidBody);
                this.controller = controller;
                this.hasRigidBody = true;
                this.velocity = 1;
                this.shape = new WSA.Rect(ctx, construct);
                this.controller.init();
                this.life = life;
                this.oldState.shape = [];
            }
            resolveCollision() {
                if (!this.colliding)
                    return;
                if (this.targetCollider.bodyType === WSA.rigidBodyType.wall) {
                    this.restoreState();
                }
                else if (this.targetCollider.bodyType === WSA.rigidBodyType.weapons) {
                    this.life--;
                    console.log(this.life);
                }
                this.colliding = false;
                this.setTargetCollider(null);
            }
            update(progress) {
                let pressedKeys = this.controller.getKeys();
                this.saveState();
                this.updateShapePosition(pressedKeys, progress);
                this.updateRigidBodyBounds({
                    l: this.shape.x,
                    r: this.shape.x + this.shape.width,
                    t: this.shape.y,
                    b: this.shape.y + this.shape.height
                });
            }
            saveState() {
                super.saveState();
                this.oldState.shape.push(Object.assign({}, this.shape));
            }
            restoreState() {
                super.restoreState();
                Object.assign(this.shape, this.oldState.shape.pop());
                //this.shape = this.oldState.shape.pop();
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
        }
        Platform.Player = Player;
    })(Platform = WSA.Platform || (WSA.Platform = {}));
})(WSA || (WSA = {}));
var WSA;
(function (WSA) {
    var Platform;
    (function (Platform) {
        class PlatformGame extends WSA.Game {
            inti() {
                super.init();
                this.world.registerForce(WSA.Forces.Gravity);
            }
        }
        Platform.PlatformGame = PlatformGame;
    })(Platform = WSA.Platform || (WSA.Platform = {}));
})(WSA || (WSA = {}));
//# sourceMappingURL=wsa.js.map