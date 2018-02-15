module WSA {
    export enum rigidBodyType {
        "wall",
        "entity"
    }

    export interface IBodyBounds {
        l: number
        r: number
        t: number
        b: number
    }
    export interface IRigidBody {
        bounds: IBodyBounds
        bodyType: rigidBodyType
        colliders: rigidBodyType[]
    }

    export class RigidBody implements IRigidBody {
        
        private _bounds: IBodyBounds;
        constructor(private _bodyType: rigidBodyType, private _colliders: rigidBodyType[]){ }
        get bodyType(): rigidBodyType {
            return this._bodyType;
        }
        set bodyType(bodyType: rigidBodyType) {
            this._bodyType = bodyType;
        }
        get colliders(): rigidBodyType[] {
            return this._colliders;
        }
        set colliders(colliders: rigidBodyType[]) {
            this._colliders = colliders;
        }
        get bounds(): IBodyBounds{
            return this._bounds;
        }
        set bounds(bounds: IBodyBounds) {
            this._bounds = bounds; 
        }
        
    }
}