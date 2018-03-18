/// <reference path="../Core/engine/Engine.ts" />
/// <reference path="../Core/rigidBody/RigidBody.ts" />
module WSA {
    export interface IGame {
        //grid: Grid
        engine: IEngine
        //canvas: ICanvas
        init()
    }
    export abstract class Game implements IGame{
        //grid: Grid;
        engine: IEngine
        //canvas: ICanvas;
        constructor(body:HTMLBodyElement, size:{w:number,h:number}){    
            //this.canvas = new WSA.Canvas(size);
            this.engine = new WSA.Engine();   
            //this.grid = new WSA.Grid(size);
            //this.canvas.init(body);
        }

        init(){
            // let box = this.createBox(64,32);
            // this.engine.registerRigidEntity(box);            
            // let box2 = this.createBox(64,64);
            // this.engine.registerRigidEntity(box2);
            // let box3 = this.createBox(96,32);
            // this.engine.registerRigidEntity(box3); 
            // let box4 = this.createBox(128,128);
            // this.engine.registerRigidEntity(box4);            
            // let box5 = this.createBox(128,160);
            // this.engine.registerRigidEntity(box5);
            // let box6 = this.createBox(160,160);
            // this.engine.registerRigidEntity(box6);
            // let weapon = this.createWeaponBox(128,96);
            // this.engine.registerRigidEntity(weapon);
            // let player = this.createPlayer();
            // this.engine.registerMovingEntity(player);
            
            let player = this.createPlayer();
            this.engine.start();
        }

        private createPlayer(){
            let player = Matter.Bodies.rectangle(400, 60, 50, 50);
            Matter.Body.setAngle(player, 90);
            Matter.Body.setVelocity(player, { x: 1, y: 0 });
            this.engine.registerBody(player);
            return player;
            //return new WSA.Platform.Player(new WSA.Keyboard(), this.canvas.getContext(), playerBody, 100, this.getPlayerSprite());
        }
        // private getPlayerSprite(){
        //     let monsterImg = new Image();

        //     let sprite = new Sprite({
        //         pos: new Vector2(0,0),
        //         context: this.canvas.getContext(),
        //         width: 32,
        //         height: 40,
        //         image: monsterImg,
        //         numberOfFrames: 3,
        //         ticksPerFrame: 12
        //     });

        //     monsterImg.src = "sprites/metalslug.png";
        //     return sprite;
        // }
        // private createBox(x,y){
        //     let boxConstruct: IRectangleConstruct = {
        //         // x: 50,
        //         // y: 50,
        //         pos: new Vector2(x,y),
        //         width: 32,
        //         height: 32,
        //         fillStyle: "blue"};
        //     let boxBody = new RigidBody(rigidBodyType.wall, [],{width: 32,
        //         height: 32}); 
        //     return new WSA.Box(this.canvas.getContext(), boxConstruct, boxBody);
        // }
        // private createWeaponBox(x,y){
        //     let boxConstruct: IRectangleConstruct = {
        //         // x: 100,
        //         // y: 100,
        //         pos: new Vector2(x,y),
        //         width: 32,
        //         height: 32,
        //         fillStyle: "red"};
        //     let boxBody = new RigidBody(rigidBodyType.weapons, [],{width: 32,
        //         height: 32}); 
        //     return new WSA.Box(this.canvas.getContext(), boxConstruct, boxBody);
        // }
    }
}