/// <reference path="../../Core/entities/RigidEntity.ts" />
module WSA {
    export interface IActor extends IRigidEntity{
        id: number;
        v: Matter.Vector;
        velocity: number
    }
    export interface IActorBodyContruct extends IRigidBodyConstruct {
        angle: number
        velocity: number       
    }

    export abstract class Actor extends RigidEntity implements IActor{
        id: number;
        v: Matter.Vector;
        velocity: number;

        constructor(protected engine: IEngine, bodyConstrut: IActorBodyContruct, sprite: Sprite){   
            super(engine, sprite);
            this.v = Matter.Vector.create(0,0);
            this.velocity = bodyConstrut.velocity;
            this.setBody(bodyConstrut);
            this.setSprite(sprite);
        }
        setBody(bodyConstrut: IActorBodyContruct){
            super.setBody(bodyConstrut);
            Matter.Body.setAngle(this.body, bodyConstrut.angle);
            Matter.Body.setVelocity(this.body, this.v);
        }
        
    }
}