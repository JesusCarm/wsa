/// <reference path="../engine/Driver.ts" />
/// <reference path="../rigidBody/RigidBody.ts" />
module WSA {
    export class Game {
        private driver: IDriver;
        private canvas: ICanvas;
        constructor(body:HTMLBodyElement){    
            this.canvas = new WSA.Canvas();
            this.driver = new WSA.Driver(this.canvas);   
            this.canvas.init(body);
            this.init();
        }

        init(){
            let player = this.createPlayer();
            this.driver.registerEntity(player);
            let box = this.createBox();
            this.driver.registerEntity(box);
            let weapon = this.createWeaponBox();
            this.driver.registerEntity(weapon);
        }

        private createPlayer(){
            let playerConstruct: IRectangleConstruct = {
                x: 0,
                y: 0,
                width: 20,
                height: 20,
                fillStyle: "green"};
            let playerBody = new RigidBody(rigidBodyType.entity, [rigidBodyType.weapons, rigidBodyType.wall]);  
            return new WSA.Player(new WSA.Keyboard(), this.canvas.getContext(), playerConstruct, playerBody, 100);
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