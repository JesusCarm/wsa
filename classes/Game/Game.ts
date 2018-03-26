/// <reference path="../Core/engine/Engine.ts" />
/// <reference path="../Core/rigidBody/RigidBody.ts" />
module WSA {
    export interface IGame {
        engine: IEngine
        init()
    }
    export class Game implements IGame{
        engine: IEngine
        constructor(body:HTMLBodyElement, size:{w:number,h:number}){  
            this.engine = new WSA.Engine();   
        }

        init(){
            let player = this.createPlayer();
            this.engine.start();
            this.engine.registerActor(player);
        }

        private createPlayer(){
            let body: IActorBodyContruct = {
                angle: 0,
                velocity: 5,
                x: 400,
                y: 100,
                width: 32,
                height: 32
            }
            return new WSA.Platform.Player(this.engine, new WSA.Keyboard(), 100, body, this.getPlayerSprite(400, 100));
        }

        private getPlayerSprite(x: number, y: number){
            let monsterImg = new Image();

            let sprite = new Sprite({
                pos: new Vector2(x,y),
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
}