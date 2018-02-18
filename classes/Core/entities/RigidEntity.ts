/// <reference path="../entities/Entity" />
/// <reference path="../rigidBody/RigidBody" />
module WSA {

    export interface IRigidEntity extends IEntity{
        rigidBody: IRigidBody
        colliding: boolean
        setTargetCollider(targetBody:IRigidBody): void
        resolveCollision():void
    }

    export interface IRigidEntityState extends IEntityState {
        bounds: IBodyBounds[]
    }

    export abstract class RigidEntity extends Entity implements IRigidEntity  {
        abstract resolveCollision()
        abstract update(progress: number)

        id: number;
        public hasRigidBody: boolean = true;
        protected oldState: IRigidEntityState;
        protected shape: IRectangle;
        private _colliding: boolean;
        private _targetColliders: IRigidBody;        
        
        constructor(private _rigidBody){
            super();
            this.oldState.bounds = [];
            this._targetColliders = null;
        }

        draw(): void{
            this.shape.draw();
        }

        get rigidBody(): IRigidBody {
            return this._rigidBody;
        }
        set rigidBody(rigidBody: IRigidBody){
            this._rigidBody = rigidBody;
        }

        get targetCollider():IRigidBody {
            return this._targetColliders;
        }
        setTargetCollider(targetBody: IRigidBody){
            this.colliding = true;
            this._targetColliders = targetBody;
        }
        get colliding(): boolean {
            return this._colliding;
        }
        set colliding(colliding: boolean){
            this._colliding = colliding;
        }

        protected saveState(){
            super.saveState();
            this.oldState.bounds.push(Object.assign({},this.rigidBody.bounds));
        }
        protected restoreState(){
            super.restoreState();
            this.rigidBody.bounds = this.oldState.bounds.pop();
        }
        
        protected updateRigidBodyBounds(bounds: IBodyBounds){
            this.rigidBody.bounds = bounds;
        }
        
    }
}