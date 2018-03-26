/// <reference path="../../Core/controllers/Keyboard.ts" />
/// <reference path="../../Core/engine/Vector/Vector2.ts" />
/// <reference path="../../Core/entities/Actor.ts" />

module WSA.Platform {

    export interface IPlayer extends IActor{
        life: number
    }

    export class Player extends Actor implements IPlayer {
        life: number;
        v: Matter.Vector;
        velocity: number;

        constructor(protected engine: IEngine, private controller: IKeyboard, life:number, bodyConstruct: IActorBodyContruct, sprite: Sprite){
            super(engine, bodyConstruct, sprite);
            this.controller.init(this.inputVector);
            this.life = life;
        }      

        protected inputVector = (pressedKeys: IPressedKeys) => {
            // user attempt to move the object
            let p = 0.3 * this.velocity;
            p = Math.min(p, 1);
            this.v.x = pressedKeys.left ? -1*p : pressedKeys.right ? 1*p  : 0;            
            this.v.y = pressedKeys.up ? -1*p : pressedKeys.down ? 1*p  : 0;            
            Matter.Body.setVelocity(this.body, this.v);
        }

    }
}