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
                this.getKeys();
            };
            this.keyup = (event) => {
                var key = keyMap[event.keyCode];
                this.pressedKeys[key] = false;
                this.getKeys();
            };
            this.pressedKeys = {
                left: false,
                right: false,
                up: false,
                down: false,
                space: false
            };
        }
        init(onKeyPress) {
            this.onKeyPress = onKeyPress;
            window.addEventListener("keydown", this.keydown, false);
            window.addEventListener("keyup", this.keyup, false);
        }
        getKeys() {
            this.onKeyPress(this.pressedKeys);
            //return this.pressedKeys;
        }
    }
    WSA.Keyboard = Keyboard;
})(WSA || (WSA = {}));
/// <reference path="../canvas/Canvas.ts" />
var WSA;
(function (WSA) {
    class Engine {
        constructor() {
            this.lastRender = 0;
            this.progress = 0;
            this.matter = new WSA.InitMatter();
            this.context = this.matter.canvas.getContext("2d");
        }
        start() {
            this.initWorldBounds();
        }
        initWorldBounds() {
            this.matter.registerComposite([
                // walls
                Matter.Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
                Matter.Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
                Matter.Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
                Matter.Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
            ]);
        }
        registerActor(actor) {
            this.matter.registerActor(actor);
        }
        registerBody(body) {
            this.matter.registerComposite(body);
        }
    }
    WSA.Engine = Engine;
})(WSA || (WSA = {}));
/// <reference path="../../../lib/matter-js-0.10.0/matter-js/index.d.ts" />
var WSA;
(function (WSA) {
    class InitMatter {
        constructor() {
            this.Engine = Matter.Engine;
            this.Render = Matter.Render;
            this.Runner = Matter.Runner;
            this.Composites = Matter.Composites;
            //Common = Matter.Common,
            this.MouseConstraint = Matter.MouseConstraint;
            this.Mouse = Matter.Mouse;
            this.World = Matter.World;
            this.Bodies = Matter.Bodies;
            // create engine
            let noGravity = Matter.Vector.create(0, 0);
            noGravity.scale = 0;
            let wroldDef = {
                gravity: noGravity
            };
            let engineDef = {
                world: Matter.World.create(wroldDef)
            };
            this.engine = this.Engine.create(engineDef),
                this.world = this.engine.world;
            // create renderer
            this.render = this.Render.create({
                element: document.body,
                engine: this.engine,
                options: {
                    width: 800,
                    height: 600,
                    wireframes: false
                    //showAngleIndicator: true
                }
            });
            this.Render.run(this.render);
            // create loop
            this.loop = new WSA.Loop();
            // this.runner = this.Runner.create({});
            // this.Runner.run(this.runner, this.engine);
            this.loop.run(this.engine);
            this.canvas = this.render.canvas;
        }
        registerComposite(bodies) {
            this.World.add(this.world, bodies);
        }
        registerActor(actor) {
            this.registerComposite(actor.body);
            actor.body;
            this.render.
                DOING;
            // REGISTER SPRITE TO THE LOOP
        }
        stop() {
            Matter.Render.stop(this.render);
            this.loop.stop();
        }
    }
    WSA.InitMatter = InitMatter;
})(WSA || (WSA = {}));
var WSA;
(function (WSA) {
    var _requestAnimationFrame, _cancelAnimationFrame;
    if (typeof window !== 'undefined') {
        _requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
        _cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame;
    }
    if (!_requestAnimationFrame) {
        var _frameTimeout;
        _requestAnimationFrame = function (callback) {
            _frameTimeout = setTimeout(function () {
                callback(window.performance.now());
            }, 1000 / 60);
        };
        _cancelAnimationFrame = function () {
            clearTimeout(_frameTimeout);
        };
    }
    class Loop {
        constructor(options) {
            this.render = (time) => {
                this.frameRequestId = _requestAnimationFrame(this.render);
                if (time && this.enabled) {
                    this.tick(time);
                }
            };
            this.fps = 60;
            this.correction = 1;
            this.deltaSampleSize = 60;
            this.counterTimestamp = 0;
            this.frameCounter = 0;
            this.deltaHistory = [];
            this.timePrev = null;
            this.timeScalePrev = 1;
            this.frameRequestId = null;
            this.isFixed = false;
            this.enabled = true;
            if (options) {
                for (const key in options) {
                    if (options.hasOwnProperty(key)) {
                        if (options.hasOwnProperty(key)) {
                            this[key] = options[key];
                        }
                    }
                }
            }
            this.delta = this.delta || 1000 / this.fps;
            this.deltaMin = this.deltaMin || 1000 / this.fps;
            this.deltaMax = this.deltaMax || 1000 / (this.fps * 0.5);
            this.fps = 1000 / this.delta;
        }
        run(engine) {
            this.engine = engine;
            this.render();
        }
        ;
        tick(time) {
            var timing = this.engine.timing, correction = 1, delta;
            // create an event object
            var event = {
                timestamp: timing.timestamp
            };
            Matter.Events.trigger(this, 'beforeTick');
            if (this.isFixed) {
                // fixed timestep
                delta = this.delta;
            }
            else {
                // dynamic timestep based on wall clock between calls
                delta = (time - this.timePrev) || this.delta;
                this.timePrev = time;
                // optimistically filter delta over a few frames, to improve stability
                this.deltaHistory.push(delta);
                this.deltaHistory = this.deltaHistory.slice(-this.deltaSampleSize);
                delta = Math.min.apply(null, this.deltaHistory);
                // limit delta
                delta = delta < this.deltaMin ? this.deltaMin : delta;
                delta = delta > this.deltaMax ? this.deltaMax : delta;
                // correction for delta
                correction = delta / this.delta;
                // update this.engine timing object
                this.delta = delta;
            }
            // time correction for time scaling
            if (this.timeScalePrev !== 0)
                correction *= timing.timeScale / this.timeScalePrev;
            if (timing.timeScale === 0)
                correction = 0;
            this.timeScalePrev = timing.timeScale;
            this.correction = correction;
            // fps counter
            this.frameCounter += 1;
            if (time - this.counterTimestamp >= 1000) {
                this.fps = this.frameCounter * ((time - this.counterTimestamp) / 1000);
                this.counterTimestamp = time;
                this.frameCounter = 0;
            }
            Matter.Events.trigger(this, 'tick');
            // Events.trigger(this.engine, 'tick', event); // @deprecated
            // // if world has been modified, clear the render scene graph
            // if (this.engine.world.isModified 
            //     && this.engine.render
            //     && this.engine.render.controller
            //     && this.engine.render.controller.clear) {
            //     this.engine.render.controller.clear(this.engine.render); // @deprecated
            // }
            // update
            Matter.Events.trigger(this, 'beforeUpdate');
            Matter.Engine.update(this.engine, delta, correction);
            Matter.Events.trigger(this, 'afterUpdate');
            // render
            // @deprecated
            // if (this.engine.render && this.engine.render.controller) {
            //     Events.trigger(this, 'beforeRender', event);
            //     Events.trigger(this.engine, 'beforeRender', event); // @deprecated
            //     this.engine.render.controller.world(this.engine.render);
            //     Events.trigger(this, 'afterRender', event);
            //     Events.trigger(this.engine, 'afterRender', event); // @deprecated
            // }
            Matter.Events.trigger(this, 'afterTick');
        }
        stop() {
            _cancelAnimationFrame(this.frameRequestId);
        }
        ;
        start() {
            this.run(this.engine);
        }
        ;
    }
    WSA.Loop = Loop;
})(WSA || (WSA = {}));
/// <reference path="../../../lib/matter-js-0.10.0/matter-js/index.d.ts" />
var WSA;
(function (WSA) {
    let Layer;
    (function (Layer) {
        Layer[Layer["background"] = 0] = "background";
        Layer[Layer["floor"] = 1] = "floor";
        Layer[Layer["ground"] = 2] = "ground";
        Layer[Layer["foreground"] = 3] = "foreground";
        Layer[Layer["air"] = 4] = "air";
    })(Layer = WSA.Layer || (WSA.Layer = {}));
    ;
    class Renderer {
        constructor() {
        }
        update() {
        }
        registerEntity(entity, z) {
            this.entities[z].push(entity);
        }
    }
    WSA.Renderer = Renderer;
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
var WSA;
(function (WSA) {
    class Entity {
        constructor() {
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
        constructor(engine, sprite) {
            super();
            this.engine = engine;
            this.sprite = sprite;
        }
        setBody(bodyConstrut) {
            this.body = Matter.Bodies.rectangle(bodyConstrut.x, bodyConstrut.y, bodyConstrut.width, bodyConstrut.height, bodyConstrut.options);
        }
        setSprite(sprite) {
            this.sprite = sprite;
        }
        get body() {
            return this._body;
        }
        set body(rigidBody) {
            this._body = rigidBody;
        }
    }
    WSA.RigidEntity = RigidEntity;
})(WSA || (WSA = {}));
/// <reference path="../../Core/entities/RigidEntity.ts" />
var WSA;
(function (WSA) {
    class Actor extends WSA.RigidEntity {
        constructor(engine, bodyConstrut, sprite) {
            super(engine, sprite);
            this.engine = engine;
            this.v = Matter.Vector.create(0, 0);
            this.velocity = bodyConstrut.velocity;
            this.setBody(bodyConstrut);
            this.setSprite(sprite);
        }
        setBody(bodyConstrut) {
            super.setBody(bodyConstrut);
            Matter.Body.setAngle(this.body, bodyConstrut.angle);
            Matter.Body.setVelocity(this.body, this.v);
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
            // window.game.grid.positionStaticElement(this.shape.pos, this);
        }
    }
    WSA.RigidStaticEntity = RigidStaticEntity;
})(WSA || (WSA = {}));
/// <reference path="../../Core/controllers/Keyboard.ts" />
/// <reference path="../../Core/engine/Vector/Vector2.ts" />
/// <reference path="../../Core/entities/RigidEntity.ts" />
var WSA;
(function (WSA) {
    class Wall extends WSA.RigidEntity {
        constructor(engine, sprite) {
            super(engine);
            this.engine = engine;
        }
    }
    WSA.Wall = Wall;
})(WSA || (WSA = {}));
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
        update() { }
    }
    WSA.Rect = Rect;
})(WSA || (WSA = {}));
var WSA;
(function (WSA) {
    class Sprite {
        constructor(options) {
            this.frameIndex = 0;
            this.tickCount = 0;
            this.pos = options.pos;
            this.context = options.context;
            this.width = options.width;
            this.height = options.height;
            this.image = options.image;
            this.ticksPerFrame = options.ticksPerFrame || 0;
            this.numberOfFrames = options.numberOfFrames || 1;
        }
        update() {
            this.tickCount += 1;
            if (this.tickCount > this.ticksPerFrame) {
                this.tickCount = 0;
                // If the current frame index is in range
                if (this.frameIndex < this.numberOfFrames - 1) {
                    // Go to the next frame
                    this.frameIndex += 1;
                }
                else {
                    this.frameIndex = 0;
                }
            }
        }
        ;
        draw() {
            // Draw the animation
            let frameWidth = this.width / this.numberOfFrames;
            this.context.drawImage(this.image, 3 + (this.frameIndex * this.width), 0, this.width, this.height, this.pos.x, this.pos.y, this.width, this.height);
        }
        ;
    }
    WSA.Sprite = Sprite;
})(WSA || (WSA = {}));
/// <reference path="../Core/engine/Engine.ts" />
/// <reference path="../Core/rigidBody/RigidBody.ts" />
var WSA;
(function (WSA) {
    class Game {
        constructor(body, size) {
            this.engine = new WSA.Engine();
        }
        init() {
            let player = this.createPlayer();
            this.engine.start();
            this.engine.registerActor(player);
        }
        createPlayer() {
            let body = {
                angle: 0,
                velocity: 5,
                x: 400,
                y: 100,
                width: 32,
                height: 32
            };
            return new WSA.Platform.Player(this.engine, new WSA.Keyboard(), 100, body, this.getPlayerSprite(400, 100));
        }
        getPlayerSprite(x, y) {
            let monsterImg = new Image();
            let sprite = new WSA.Sprite({
                pos: new WSA.Vector2(x, y),
                context: this.engine.context,
                width: 32,
                height: 40,
                image: monsterImg,
                numberOfFrames: 3,
                ticksPerFrame: 12
            });
            monsterImg.src = "sprites/metalslug.png";
            return sprite;
        }
    }
    WSA.Game = Game;
})(WSA || (WSA = {}));
document.addEventListener("DOMContentLoaded", function () {
    let body = document.getElementsByTagName("body").item(0);
    let width = body.clientWidth, height = Math.floor(body.clientHeight / 32) * 32;
    window.game = new WSA.Game(body, { w: width, h: height });
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
            constructor(engine, controller, life, bodyConstruct, sprite) {
                super(engine, bodyConstruct, sprite);
                this.engine = engine;
                this.controller = controller;
                this.inputVector = (pressedKeys) => {
                    // user attempt to move the object
                    let p = 0.3 * this.velocity;
                    p = Math.min(p, 1);
                    this.v.x = pressedKeys.left ? -1 * p : pressedKeys.right ? 1 * p : 0;
                    this.v.y = pressedKeys.up ? -1 * p : pressedKeys.down ? 1 * p : 0;
                    Matter.Body.setVelocity(this.body, this.v);
                };
                this.controller.init(this.inputVector);
                this.life = life;
            }
        }
        Platform.Player = Player;
    })(Platform = WSA.Platform || (WSA.Platform = {}));
})(WSA || (WSA = {}));
//# sourceMappingURL=wsa.js.map