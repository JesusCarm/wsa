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
        }

        private createPlayer(){
            let playerConstruct: IRectangleConstruct = {
                x: 0,
                y: 0,
                width: 20,
                height: 20,
                fillStyle: "red"};
            let playerBody = new RigidBody(rigidBodyType.entity, [rigidBodyType.entity, rigidBodyType.wall]);  
            return new WSA.Player(new WSA.Keyboard(), this.canvas.getContext(), playerConstruct, playerBody);
        }
        private createBox(){
            let boxConstruct: IRectangleConstruct = {
                x: 50,
                y: 50,
                width: 20,
                height: 20,
                fillStyle: "blue"};
            let boxBody = new RigidBody(rigidBodyType.entity, []); 
            return new WSA.Box(this.canvas.getContext(), boxConstruct, boxBody);
        }
    }
}