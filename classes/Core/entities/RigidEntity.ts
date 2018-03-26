/// <reference path="../entities/Entity.ts" />
/// <reference path="../rigidBody/RigidBody.ts" />
module WSA {

    export interface IRigidEntity extends IEntity{
        
    }   
    export interface IRigidBodyConstruct {
        x: number
        y: number
        width: number
        height: number
    }

    export abstract class RigidEntity extends Entity implements IRigidEntity  {
        
        private _body: Matter.Body;

        constructor(protected engine: IEngine, public sprite: Sprite){
            super();
        }

        setBody(bodyConstrut: IRigidBodyConstruct){
            this.body = Matter.Bodies.rectangle(bodyConstrut.x, bodyConstrut.y, bodyConstrut.width, bodyConstrut.height, bodyConstrut.options);
        }  
        setSprite(sprite: Sprite){
            this.sprite = sprite;
        }

        get body(): Matter.Body {
            return this._body;
        }
        set body(rigidBody: Matter.Body){
            this._body = rigidBody;
        }
        
    }
}