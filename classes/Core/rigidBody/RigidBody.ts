module WSA {
    export enum rigidBodyType {
        "wall",
        "entity",
        "weapons"
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
        center: Vector2
        colliders: rigidBodyType[]        
        height: number
        width: number
    }
    export interface IRigidbodySize {
        // x:number,
        // y:number,
        width:number,
        height:number
    }

    export class RigidBody implements IRigidBody {  

        center: Vector2;
        height: number;
        width: number;
        private _bounds: IBodyBounds;

        constructor(private _bodyType: rigidBodyType, private _colliders: rigidBodyType[], coords:IRigidbodySize){ 
            // this.x = coords.x;
            // this.y = coords.y;
            this.width = coords.width;
            this.height = coords.height;

        }
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
            this.center = new Vector2(
                this.width/2 + bounds.l,
                this.height/2 + bounds.t
            )
        }
        
    }
}