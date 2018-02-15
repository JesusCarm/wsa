/// <reference path="../entities/Entity" />
module WSA {

    export interface IRigidEntity extends IEntity{
        rigidBody: IRigidBody
        bounds: IBodyBounds
    }

    export abstract class RigidEntity implements IRigidEntity {
        _bounds: any;
        id: number;
        constructor(private _rigidBody){}
        get rigidBody(): IRigidBody {
            return this._rigidBody;
        }
        set rigidBody(rigidBody: IRigidBody){
            this._rigidBody = rigidBody;
        }
        get bounds(): IBodyBounds {
            return this._bounds;
        }
        set bounds(bounds: IBodyBounds){
            this._bounds = bounds;
        }
        public hasRigidBody: boolean = true;
        abstract update(progress:number)
        abstract draw()
    }
}