/// <reference path="../Core/engine/World.ts" />
/// <reference path="../Core/rigidBody/RigidBody.ts" />
module WSA {
    export abstract class Game {
        protected world: IWorld;
        private canvas: ICanvas;
        constructor(body:HTMLBodyElement, size:{w:number,h:number}){    
            this.canvas = new WSA.Canvas(size);
            this.world = new WSA.World(this.canvas);   
            this.canvas.init(body);
            this.init();
        }

        init(){
            let player = this.createPlayer();
            this.world.registerEntity(player);
            let box = this.createBox();
            this.world.registerEntity(box);
            let weapon = this.createWeaponBox();
            this.world.registerEntity(weapon);
        }

        private createPlayer(){
            let playerConstruct: IRectangleConstruct = {
                x: 0,
                y: 0,
                width: 20,
                height: 20,
                fillStyle: "green"};
            let playerBody = new RigidBody(rigidBodyType.entity, [rigidBodyType.weapons, rigidBodyType.wall]);  
            return new WSA.Platform.Player(new WSA.Keyboard(), this.canvas.getContext(), playerConstruct, playerBody, 100);
        }
        private createBox(){
            let boxConstruct: IRectangleConstruct = {
                x: 50,
                y: 50,
                width: 20,
                height: 20,
                fillStyle: "blue"};
            let boxBody = new RigidBody(rigidBodyType.wall, []); 
            return new WSA.Box(this.canvas.getContext(), boxConstruct, boxBody);
        }
        private createWeaponBox(){
            let boxConstruct: IRectangleConstruct = {
                x: 100,
                y: 100,
                width: 20,
                height: 20,
                fillStyle: "red"};
            let boxBody = new RigidBody(rigidBodyType.weapons, []); 
            return new WSA.Box(this.canvas.getContext(), boxConstruct, boxBody);
        }
    }
}