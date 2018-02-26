/// <reference path="../Core/engine/World.ts" />
/// <reference path="../Core/rigidBody/RigidBody.ts" />
module WSA {
    export interface IGame {
        grid: Grid
        world: IWorld
        canvas: ICanvas
        init()
    }
    export abstract class Game implements IGame{
        grid: Grid;
        world: IWorld;
        canvas: ICanvas;
        constructor(body:HTMLBodyElement, size:{w:number,h:number}){    
            this.canvas = new WSA.Canvas(size);
            this.world = new WSA.World(this.canvas);   
            this.grid = new WSA.Grid(size);
            this.canvas.init(body);
        }

        init(){
            let box = this.createBox(64,32);
            this.world.registerRigidEntity(box);            
            let box2 = this.createBox(64,64);
            this.world.registerRigidEntity(box2);
            let box3 = this.createBox(96,32);
            this.world.registerRigidEntity(box3); 
            let box4 = this.createBox(128,128);
            this.world.registerRigidEntity(box4);            
            let box5 = this.createBox(128,160);
            this.world.registerRigidEntity(box5);
            let box6 = this.createBox(160,160);
            this.world.registerRigidEntity(box6);
            let weapon = this.createWeaponBox(128,96);
            this.world.registerRigidEntity(weapon);
            let player = this.createPlayer();
            this.world.registerMovingEntity(player);
            this.world.engine.start();
        }

        private createPlayer(){
            let playerConstruct: IRectangleConstruct = {
                // x: 0,
                // y: 50,
                pos: new Vector2(0,0),
                width: 32,
                height: 32,
                fillStyle: "green"};
            let playerBody = new RigidBody(rigidBodyType.entity, [rigidBodyType.weapons, rigidBodyType.wall],{
                width: 32,
                height: 32,});  
            return new WSA.Platform.Player(new WSA.Keyboard(), this.canvas.getContext(), playerConstruct, playerBody, 100);
        }
        private createBox(x,y){
            let boxConstruct: IRectangleConstruct = {
                // x: 50,
                // y: 50,
                pos: new Vector2(x,y),
                width: 32,
                height: 32,
                fillStyle: "blue"};
            let boxBody = new RigidBody(rigidBodyType.wall, [],{width: 32,
                height: 32}); 
            return new WSA.Box(this.canvas.getContext(), boxConstruct, boxBody);
        }
        private createWeaponBox(x,y){
            let boxConstruct: IRectangleConstruct = {
                // x: 100,
                // y: 100,
                pos: new Vector2(x,y),
                width: 32,
                height: 32,
                fillStyle: "red"};
            let boxBody = new RigidBody(rigidBodyType.weapons, [],{width: 32,
                height: 32}); 
            return new WSA.Box(this.canvas.getContext(), boxConstruct, boxBody);
        }
    }
}