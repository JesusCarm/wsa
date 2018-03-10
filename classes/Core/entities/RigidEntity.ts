/// <reference path="../entities/Entity.ts" />
/// <reference path="../rigidBody/RigidBody.ts" />
module WSA {

    export interface IRigidEntity extends IEntity{
        rigidBody: IRigidBody
        colliding: boolean
        //setTargetCollider(targetBody:IRigidBody): void
        resolveCollision(targetEntity: IRigidEntity):void
    }   

    export abstract class RigidEntity extends Entity implements IRigidEntity  {
        abstract resolveCollision(targetEntity: IRigidEntity)
        abstract update()

        id: number;
        public hasRigidBody: boolean = true;
        public stateChange:boolean = false;
        protected shape: IRectangle;
        private _colliding: boolean;
        //private _targetColliders: IRigidBody;        
        
        constructor(private _rigidBody){
            super();
            //this._targetColliders = null;
            window.game.world.registerRigidEntity(this);
        }

        get rigidBody(): IRigidBody {
            return this._rigidBody;
        }
        set rigidBody(rigidBody: IRigidBody){
            this._rigidBody = rigidBody;
        }

        // get targetCollider():IRigidBody {
        //     return this._targetColliders;
        // }
        // setTargetCollider(targetBody: IRigidBody){
        //     this.colliding = true;
        //     this._targetColliders = targetBody;
        // }
        get colliding(): boolean {
            return this._colliding;
        }
        set colliding(colliding: boolean){
            this._colliding = colliding;
        }

        protected updateRigidBodyCoords(pos: Vector2){
            this.rigidBody.bounds = {
                l: pos.x,
                r: pos.x + this.rigidBody.width,
                t: pos.y,
                b: pos.y + this.rigidBody.height
            };
        }
        
    }
}