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
    class Vector2 {
        constructor(x = 0, y = 0) {
            this.c = [0, 0];
            this.x = x;
            this.y = y;
        }
        /*
            GETTERS / SETTERS
        */
        get x() {
            return this.c[0];
        }
        get y() {
            return this.c[1];
        }
        set x(x) {
            this.c[0] = x;
        }
        set y(y) {
            this.c[1] = y;
        }
        getX() {
            return this.x;
        }
        getY() {
            return this.y;
        }
        get(i) {
            return this.c[i];
        }
        getCoordinates() {
            return this.c;
        }
        setX(x) {
            this.x = x;
            return this;
        }
        setY(y) {
            this.y = y;
            return this;
        }
        set(x, y) {
            this.x = x;
            this.y = y;
            return this;
        }
        add() {
            if (arguments[0] instanceof Vector2) {
                if (arguments[1] instanceof Vector2) {
                    return new Vector2(arguments[0].x + arguments[1].x, arguments[0].y + arguments[1].y);
                }
                else {
                    this.x += arguments[0].x;
                    this.y += arguments[0].y;
                }
            }
            else {
                this.x += arguments[0];
                this.y += arguments[1];
            }
            return this;
        }
        subtract() {
            if (arguments[0] instanceof Vector2) {
                if (arguments[1] instanceof Vector2) {
                    return new Vector2(arguments[0].x - arguments[1].x, arguments[0].y - arguments[1].y);
                }
                else {
                    this.x -= arguments[0].x;
                    this.y -= arguments[0].y;
                }
            }
            else {
                this.x -= arguments[0];
                this.y -= arguments[1];
            }
            return this;
        }
        multiply() {
            if (typeof arguments[0] === "number" && arguments[1] === undefined) {
                this.x *= arguments[0];
                this.y *= arguments[0];
            }
            else if (arguments[0] instanceof Vector2) {
                if (arguments[1] instanceof Vector2) {
                    return new Vector2(arguments[0].x * arguments[1].x, arguments[0].y * arguments[1].y);
                }
                else {
                    this.x *= arguments[0].x;
                    this.y *= arguments[0].y;
                }
            }
            else {
                this.x *= arguments[0];
                this.y *= arguments[1];
            }
            return this;
        }
        divide() {
            if (arguments[0] instanceof Vector2) {
                if (arguments[1] instanceof Vector2) {
                    return new Vector2(arguments[0].x / arguments[1].x, arguments[0].y / arguments[1].y);
                }
                else {
                    this.x /= arguments[0].x;
                    this.y /= arguments[0].y;
                }
            }
            else {
                this.x /= arguments[0];
                this.y /= arguments[1];
            }
            return this;
        }
        scale(n) {
            this.x *= n;
            this.y *= n;
            return this;
        }
        negate() {
            return this.scale(-1);
        }
        normalize() {
            var length = this.getLength();
            if (length === 0)
                return this.set(0, 0);
            return this.scale(1.0 / length);
        }
        /*
            ADDITIONAL FUNCTIONS
        */
        getLength() {
            return Math.sqrt(this.getSquaredLength());
        }
        getSquaredLength() {
            return this.x * this.x + this.y * this.y;
        }
        copy() {
            return new Vector2(this.x, this.y);
        }
        equals(v) {
            return v.x == this.x && v.y == this.y;
        }
        toString() {
            return "[" + this.x + ", " + this.y + "]";
        }
        /*
            STATIC FUNCTIONS
        */
        static dot(v1, v2) {
            return (v1.x * v2.x + v1.y * v2.y);
        }
        static cross(v1, v2) {
            return (v1.x * v2.y - v1.y * v2.x);
        }
        static distance(v1, v2) {
            var x = v2.x - v1.x;
            var y = v2.y - v1.y;
            return Math.sqrt(x * x + y * y);
        }
        // a1 is line1 start, a2 is line1 end, b1 is line2 start, b2 is line2 end
        static intersection(a1, a2, b1, b2) {
            let vector2 = new Vector2();
            let b = vector2.subtract(a2, a1); //a2 - a1;
            let d = vector2.subtract(b2, b1); // b2 - b1;
            let bDotDPerp = b.x * d.y - b.y * d.x;
            // if b dot d == 0, it means the lines are parallel so have infinite intersection points
            if (bDotDPerp == 0)
                return null;
            let c = vector2.subtract(b1, a1); //b1 - a1;
            let t = (c.x * d.y - c.y * d.x) / bDotDPerp;
            if (t < 0 || t > 1)
                return null;
            let u = (c.x * b.y - c.y * b.x) / bDotDPerp;
            if (u < 0 || u > 1)
                return null;
            return vector2.add(a1, b.multiply(t)); // + t * b;
        }
        /*
            STATIC VARIABLES
        */
        static get ZERO() {
            return new Vector2(0, 0);
        }
        static get ONE() {
            return new Vector2(1, 1);
        }
        static get RIGHT() {
            return new Vector2(1, 0);
        }
        static get LEFT() {
            return new Vector2(-1, 0);
        }
        static get UP() {
            return new Vector2(0, 1);
        }
        static get DOWN() {
            return new Vector2(0, -1);
        }
    }
    WSA.Vector2 = Vector2;
})(WSA || (WSA = {}));
/// <reference path="../engine/Vector/Vector2.ts" />
var WSA;
(function (WSA) {
    class Grid {
        constructor(size) {
            this.size = size;
            this.gridUnit = 32;
            this.grid = this.createEmptyGrid();
            this.actorsGrid = this.createEmptyGrid();
            this.vector2 = new WSA.Vector2();
        }
        emptyActorsGrid() {
        }
        positionStaticElement(pos, rigidEntity) {
            let x = pos.getX(), y = pos.getY();
            let x1 = x >= 32 ? Math.floor(x / 32) : 0;
            let y1 = y >= 32 ? Math.floor(y / 32) : 0;
            this.addElementToGrid(this.grid, x1, y1, rigidEntity);
        }
        positionActor(pos, v, actor) {
            let v2 = pos.add(pos, v), x1 = v2.getX(), y1 = v2.getY();
            let areaX = x1 / 32;
            let areaY = y1 / 32;
            let ax = Math.floor(areaX);
            let ay = Math.floor(areaY);
            let offsetX = areaX - ax;
            let offsetY = areaY - ay;
            let diffs = [];
            let populatedAreas = [];
            this.getPopulatedArea(ax, ay, populatedAreas);
            // if(this.grid[ax] && this.grid[ax][ay]) populatedAreas.push(this.grid[ax][ay]);
            // this.checkStaticPosition(diffs, ax, ay, actor)
            if (offsetX !== 0) {
                this.getPopulatedArea(ax + 1, ay, populatedAreas);
                //this.checkStaticPosition(diffs, ax + 1, ay, actor);
            }
            if (offsetY !== 0) {
                this.getPopulatedArea(ax, ay + 1, populatedAreas);
                //this.checkStaticPosition(diffs, ax, ay + 1, actor);
            }
            if (offsetX !== 0 && offsetY !== 0) {
                this.getPopulatedArea(ax + 1, ay + 1, populatedAreas);
                //this.checkStaticPosition(diffs, ax + 1, ay + 1, actor);
            }
            getClosestArea();
            if (diffs.length) {
                return diffs.reduce((prev, current) => {
                    return {
                        dy: Math.abs(prev.dy) >= Math.abs(current.dy) ? current.dy : prev.dy,
                        dx: Math.abs(prev.dx) >= Math.abs(current.dx) ? current.dx : prev.dx
                    };
                });
            }
            else
                return null;
        }
        getPopulatedArea(ax, ay, populatedAreas) {
            if (this.grid[ax] && this.grid[ax][ay])
                populatedAreas.push(this.grid[ax][ay]);
        }
        getClosestArea(actor, populatedAreas) {
            let actorCenter = actor.rigidBody.center;
            populatedAreas.forEach((area) => {
                let distance = this.vector2.
                ;
                let areaCenter = area.center;
                areaCenter.
                ;
            });
            return populatedAreas.map((area) => {
                let areaCenter = area.center;
                areaCenter.
                ;
            });
        }
        checkStaticPosition(diffs, ax, ay, actor) {
            if (this.grid[ax] && this.grid[ax][ay])
                diffs.push(this.resolveCollitionActorStaticEntity(actor, this.grid[ax][ay]));
            else
                this.addElementToGrid(this.actorsGrid, ax, ay, actor);
        }
        addElementToGrid(grid, x, y, rigidEntity) {
            if (grid[x])
                grid[x][y] = rigidEntity;
            else
                console.log('no entry on the grid');
        }
        createEmptyGrid() {
            let ARRAY_SIZE = (this.size.w / this.gridUnit) + 1;
            let a = new Array(ARRAY_SIZE);
            for (var i = 0; i < ARRAY_SIZE; i++) {
                a[i] = [];
            }
            return a;
        }
        resolveCollitionActorStaticEntity(actor, rigidEntity) {
            let dy = actor.v.y, dx = actor.v.x;
            let bounds = rigidEntity.rigidBody.bounds;
            let actorBounds = actor.rigidBody.bounds;
            let c1 = rigidEntity.rigidBody.center, c2 = actor.rigidBody.center;
            if (Math.abs(c1.x - c2.x) > Math.abs(c1.y - c2.y)) {
                // horizontal collision
                //console.log('horizontal collision');
                if (actorBounds.l >= bounds.r) {
                    // actor is at the right
                    dx = bounds.r - actorBounds.l;
                }
                else if (actorBounds.r <= bounds.l) {
                    // actor is at the left
                    dx = bounds.l - actorBounds.r;
                }
            }
            else {
                // vertical collision
                //console.log('vertical collision');
                if (actorBounds.t >= bounds.b) {
                    // actor is at the bottom
                    dy = bounds.b - actorBounds.t;
                }
                else if (actorBounds.b <= bounds.t) {
                    // actor is at the top
                    dy = bounds.t - actorBounds.b;
                }
            }
            return {
                dy: dy,
                dx: dx
            };
        }
    }
    WSA.Grid = Grid;
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
        keyMap[keyMap["space"] = 32] = "space";
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
                down: false,
                space: false
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
        // abstract getNewState(progress:number)
        init() { }
        get id() {
            return this._id;
        }
        set id(id) {
            this._id = id;
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
        constructor(_bodyType, _colliders, coords) {
            this._bodyType = _bodyType;
            this._colliders = _colliders;
            // this.x = coords.x;
            // this.y = coords.y;
            this.width = coords.width;
            this.height = coords.height;
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
            this.center = new WSA.Vector2(this.width / 2 + bounds.l, this.height / 2 + bounds.t);
        }
    }
    WSA.RigidBody = RigidBody;
})(WSA || (WSA = {}));
/// <reference path="../entities/Entity.ts" />
/// <reference path="../rigidBody/RigidBody.ts" />
var WSA;
(function (WSA) {
    class RigidEntity extends WSA.Entity {
        //private _targetColliders: IRigidBody;        
        constructor(_rigidBody) {
            super();
            this._rigidBody = _rigidBody;
            this.hasRigidBody = true;
            this.stateChange = false;
            //this._targetColliders = null;
            window.game.world.registerRigidEntity(this);
        }
        get rigidBody() {
            return this._rigidBody;
        }
        set rigidBody(rigidBody) {
            this._rigidBody = rigidBody;
        }
        // get targetCollider():IRigidBody {
        //     return this._targetColliders;
        // }
        // setTargetCollider(targetBody: IRigidBody){
        //     this.colliding = true;
        //     this._targetColliders = targetBody;
        // }
        get colliding() {
            return this._colliding;
        }
        set colliding(colliding) {
            this._colliding = colliding;
        }
        updateRigidBodyCoords(bounds) {
            this.rigidBody.bounds = bounds;
        }
    }
    WSA.RigidEntity = RigidEntity;
})(WSA || (WSA = {}));
/// <reference path="../entities/RigidEntity.ts" />
var WSA;
(function (WSA) {
    class CollisionResolver {
        resolveActorsCollisions(actors) {
            actors.forEach((actor) => {
                actor;
            });
        }
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
                    //currentEntity.setTargetCollider(targetEntity.rigidBody);
                    currentEntity.resolveCollision(targetEntity);
                }
            });
        }
        collisionChecker(bounds, targetBounds) {
            if (bounds.l > targetBounds.r || bounds.r < targetBounds.l || bounds.t > targetBounds.b || bounds.b < targetBounds.t)
                return false;
            return true;
            // if(bounds.l < targetBounds.r  ){
            //     return 
            // }
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
                this.eraseCanvas();
                this.getNewState();
                //this.resolveCollisions();
                this.update();
                this.draw();
                this.lastRender = timestamp;
                window.requestAnimationFrame(this.loop);
            };
            this.idCounter = 0;
            this.entities = [];
            this.movingEntities = [];
            this.rigidEntities = [];
            this.collisionResolver = new WSA.CollisionResolver();
        }
        start() {
            this.initEntities();
            window.requestAnimationFrame(this.loop);
        }
        initEntities() {
            this.entities.forEach(entity => {
                entity.init();
            });
            this.rigidEntities.forEach(entity => {
                entity.init();
            });
            this.movingEntities.forEach(entity => {
                entity.init();
            });
        }
        getNewState() {
            this.movingEntities && this.movingEntities.forEach((entity) => {
                entity.getNewState(this.progress);
            });
        }
        update() {
            this.movingEntities.forEach(entity => {
                entity.update();
            });
        }
        resolveCollisions() {
            this.collisionResolver.checkCollisions(this.movingEntities);
        }
        draw() {
            this.entities.forEach(entity => {
                entity.draw();
            });
            this.rigidEntities.forEach(entity => {
                entity.draw();
            });
            this.movingEntities.forEach(entity => {
                entity.draw();
            });
        }
        registerRigidEntity(entity) {
            this.rigidEntities.push(entity);
        }
        registerMovingEntity(entity) {
            this.movingEntities.push(entity);
        }
        registerEntity(entity) {
            entity.id = this.idCounter++;
            this.entities.push(entity);
        }
        registerForce(force) {
            return force;
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
        }
        registerEntity(entity) {
            this.engine.registerEntity(entity);
        }
        registerForce(force) {
            force;
        }
        registerRigidEntity(entity) {
            this.engine.registerRigidEntity(entity);
        }
        registerMovingEntity(entity) {
            this.engine.registerMovingEntity(entity);
        }
    }
    WSA.World = World;
})(WSA || (WSA = {}));
var WSA;
(function (WSA) {
    class Actor extends WSA.RigidEntity {
        constructor(rigidBody, ctx, construct) {
            super(rigidBody);
            this.v = new WSA.Vector2(0, 0);
            this.hasRigidBody = true;
            this.vHelper = new WSA.Vector2();
            this.velocity = 5;
            this.shape = new WSA.Rect(ctx, construct);
        }
        placeOnTheGrid() {
            if (this.v.equals(WSA.Vector2.ZERO))
                return;
            let diffPos = window.game.grid.positionActor(this.shape.pos, this.v, this);
            if (diffPos) {
                this.v = new WSA.Vector2(diffPos.dx, diffPos.dy);
                console.log(this.v);
            }
        }
    }
    WSA.Actor = Actor;
})(WSA || (WSA = {}));
var WSA;
(function (WSA) {
    class RigidStaticEntity extends WSA.RigidEntity {
        init() {
            this.placeOnTheGrid();
        }
        placeOnTheGrid() {
            window.game.grid.positionStaticElement(this.shape.pos, this);
        }
    }
    WSA.RigidStaticEntity = RigidStaticEntity;
})(WSA || (WSA = {}));
/// <reference path="../controllers/Keyboard.ts" />
/// <reference path="RigidStaticEntity.ts" />
var WSA;
(function (WSA) {
    class Box extends WSA.RigidStaticEntity {
        constructor(ctx, construct, rigidBody) {
            super(rigidBody);
            this.hasRigidBody = true;
            this.shape = new WSA.Rect(ctx, construct);
            this.update();
        }
        getNewState(progress) {
            progress;
        }
        draw() {
            this.shape.draw();
        }
        update() {
            this.updateRigidBodyCoords({
                l: this.shape.pos.x,
                r: this.shape.pos.x + this.shape.width,
                t: this.shape.pos.y,
                b: this.shape.pos.y + this.shape.height
            });
        }
        resolveCollision() {
        }
    }
    WSA.Box = Box;
})(WSA || (WSA = {}));
// module WSA.Forces{
//     export interface IForce {
//         value: number
//         direction: 
//     }
//     export class Gravity {
//         value: number = 9.8;
//     } 
// }
var WSA;
(function (WSA) {
    class Rect {
        constructor(ctx, construct) {
            this.ctx = ctx;
            // this.x = construct.x;
            // this.y = construct.y;
            this.pos = construct.pos; //new Vector2(construct.x,construct.y);
            this.width = construct.width;
            this.height = construct.height;
            this.fillStyle = construct.fillStyle;
            this.lineWidth = construct.lineWidth;
            this.strokeStyle = construct.strokeStyle;
        }
        draw() {
            this.ctx.beginPath();
            this.ctx.rect(this.pos.x, this.pos.y, this.width, this.height);
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
            this.grid = new WSA.Grid(size);
            this.canvas.init(body);
        }
        init() {
            let box = this.createBox(64, 32);
            this.world.registerRigidEntity(box);
            let box2 = this.createBox(64, 64);
            this.world.registerRigidEntity(box2);
            let weapon = this.createWeaponBox(128, 96);
            this.world.registerRigidEntity(weapon);
            let player = this.createPlayer();
            this.world.registerMovingEntity(player);
            this.world.engine.start();
        }
        createPlayer() {
            let playerConstruct = {
                // x: 0,
                // y: 50,
                pos: new WSA.Vector2(0, 0),
                width: 32,
                height: 32,
                fillStyle: "green"
            };
            let playerBody = new WSA.RigidBody(WSA.rigidBodyType.entity, [WSA.rigidBodyType.weapons, WSA.rigidBodyType.wall], {
                width: 32,
                height: 32,
            });
            return new WSA.Platform.Player(new WSA.Keyboard(), this.canvas.getContext(), playerConstruct, playerBody, 100);
        }
        createBox(x, y) {
            let boxConstruct = {
                // x: 50,
                // y: 50,
                pos: new WSA.Vector2(x, y),
                width: 32,
                height: 32,
                fillStyle: "blue"
            };
            let boxBody = new WSA.RigidBody(WSA.rigidBodyType.wall, [], { width: 32,
                height: 32 });
            return new WSA.Box(this.canvas.getContext(), boxConstruct, boxBody);
        }
        createWeaponBox(x, y) {
            let boxConstruct = {
                // x: 100,
                // y: 100,
                pos: new WSA.Vector2(x, y),
                width: 32,
                height: 32,
                fillStyle: "red"
            };
            let boxBody = new WSA.RigidBody(WSA.rigidBodyType.weapons, [], { width: 32,
                height: 32 });
            return new WSA.Box(this.canvas.getContext(), boxConstruct, boxBody);
        }
    }
    WSA.Game = Game;
})(WSA || (WSA = {}));
document.addEventListener("DOMContentLoaded", function () {
    let body = document.getElementsByTagName("body").item(0);
    let width = body.clientWidth, height = Math.floor(body.clientHeight / 32) * 32;
    window.game = new WSA.Platform.PlatformGame(body, { w: width, h: height });
    window.game.init();
});
/// <reference path="../../Core/controllers/Keyboard.ts" />
/// <reference path="../../Core/engine/Vector/Vector2.ts" />
/// <reference path="../../Core/entities/Actor.ts" />
var WSA;
(function (WSA) {
    var Platform;
    (function (Platform) {
        class Player extends WSA.Actor {
            constructor(controller, ctx, construct, rigidBody, life) {
                super(rigidBody, ctx, construct);
                this.controller = controller;
                this.ctx = ctx;
                //this.debugFunction();
                this.controller.init();
                this.life = life;
                this.isJumping = false;
                this.update();
            }
            getNewState(progress) {
                let pressedKeys = this.controller.getKeys();
                if (this.debugging) {
                    this.v.x = parseInt(this.debugControls.left.value);
                    this.v.y = parseInt(this.debugControls.top.value);
                    // this.resetInputs(); 
                }
                else {
                    this.inputVector(pressedKeys, progress);
                }
                if (WSA.Vector2.ZERO.equals(this.v)) {
                    this.isStatic = true;
                }
                this.placeOnTheGrid();
                //this.saveState();
                // this.inputVector(pressedKeys,progress);
            }
            draw() {
                this.shape.draw();
                if (this.intersection) {
                    let rectConstruct = {
                        pos: this.intersection,
                        width: 2,
                        height: 2,
                        fillStyle: "red"
                    };
                    let intersection = new WSA.Rect(this.ctx, rectConstruct);
                    intersection.draw();
                }
            }
            resolveCollision(targetEntity) {
                if (targetEntity.rigidBody.bodyType === WSA.rigidBodyType.wall) {
                    this.isJumping = false;
                    this.getIntersection(targetEntity);
                }
                else if (targetEntity.rigidBody.bodyType === WSA.rigidBodyType.weapons) {
                    this.life--;
                    console.log(this.life);
                }
                this.colliding = false;
            }
            getIntersection(targetEntity) {
                // a1 is line1 start, a2 is line1 end, b1 is line2 start, b2 is line2 end
                let targetBounds = targetEntity.rigidBody.bounds;
                let tl = new WSA.Vector2(targetBounds.l, targetBounds.t);
                let bl = new WSA.Vector2(targetBounds.l, targetBounds.b);
                let finalPos = this.vHelper.add(this.rigidBody.center, this.v);
                finalPos.x += this.rigidBody.width / 2;
                this.intersection = WSA.Vector2.intersection(this.rigidBody.center, finalPos, tl, bl);
            }
            update() {
                this.updateShapePosition();
                this.updateRigidBodyCoords({
                    l: this.shape.pos.x,
                    r: this.shape.pos.x + this.shape.width,
                    t: this.shape.pos.y,
                    b: this.shape.pos.y + this.shape.height
                });
            }
            inputVector(pressedKeys, progress) {
                // user attempt to move the object
                let p = progress * this.velocity;
                p = Math.min(p, 500);
                this.v.x = pressedKeys.left ? -1 * p : pressedKeys.right ? 1 * p : 0;
                this.v.y = pressedKeys.up ? -1 * p : pressedKeys.down ? 1 * p : 0;
                if (this.v.y > 0)
                    return;
                if (pressedKeys.space)
                    this.v.y = -3 * p;
            }
            updateShapePosition() {
                if (this.debugging) {
                    this.shape.pos = new WSA.Vector2(parseInt(this.debugControls.left.value), parseInt(this.debugControls.top.value));
                }
                else {
                    this.shape.pos = this.shape.pos.add(this.v);
                }
            }
            debugFunction() {
                this.debugging = true;
                this.debugControls = {
                    top: document.getElementById("top"),
                    left: document.getElementById("left"),
                    bottom: document.getElementById("bottom"),
                    right: document.getElementById("right")
                };
            }
            resetInputs() {
                this.debugControls.left.value = "0";
                this.debugControls.top.value = "0";
                this.debugControls.right.value = "0";
                this.debugControls.bottom.value = "0";
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
                //this.world.registerForce(WSA.Forces.Gravity);
            }
        }
        Platform.PlatformGame = PlatformGame;
    })(Platform = WSA.Platform || (WSA.Platform = {}));
})(WSA || (WSA = {}));
//# sourceMappingURL=wsa.js.map