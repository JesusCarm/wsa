/// <reference path="../../Core/controllers/Keyboard.ts" />
/// <reference path="../../Core/engine/Vector/Vector2.ts" />
/// <reference path="../../Core/entities/Actor.ts" />

module WSA.Platform {

    export interface IPlayer extends IActor{
        life: number
    }

    export class Player extends Actor implements IPlayer {
        sprite: Sprite;
        public life: number;
        public v: Matter.Vector;
        protected velocity: number;

        constructor(private engine: IEngine, private controller: IKeyboard, life:number, shape: Sprite){
            super();
            this.setBody();
            this.controller.init(this.inputVector);
            this.life = life;
            this.update();
        }   

        setBody(){
            this.body = Matter.Bodies.rectangle(400, 60, 50, 50);
            Matter.Body.setAngle(this.body, 90);
            Matter.Body.setVelocity(this.body, this.v);
        }   

        draw(): void{
        }

        resolveCollision(targetEntity: IRigidEntity){
        }

        update():void{
        }

        protected inputVector = (pressedKeys: IPressedKeys)=>{
            // user attempt to move the object
            let p = 0.1 * this.velocity;
            p = Math.min(p, 1);
            this.v.x = pressedKeys.left ? -1*p : pressedKeys.right ? 1*p  : 0;            
            this.v.y = pressedKeys.up ? -1*p : pressedKeys.down ? 1*p  : 0;            
            Matter.Body.setVelocity(this.body, this.v);
        }

    }
}