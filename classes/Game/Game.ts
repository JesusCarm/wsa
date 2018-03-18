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
            return new WSA.Platform.Player(this.engine, new WSA.Keyboard(), 100, this.getPlayerSprite());
        }

        private getPlayerSprite(){
            let monsterImg = new Image();

            let sprite = new Sprite({
                pos: new Vector2(0,0),
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