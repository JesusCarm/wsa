module WSA {
    export interface IActor extends IRigidEntity{
        getNewState(progress: number)
        shape: Sprite | Rect;
        id: number;
        v: Vector2;
    }

    export abstract class Actor extends RigidEntity implements IActor{

        shape: Sprite | Rect;
        vHelper: Vector2;
        id: number;
        rigidBody: IRigidBody;
        colliding: boolean;
        hasRigidBody: boolean;
        v: Vector2;
        protected velocity: number;

        constructor(rigidBody: IRigidBody, shape: Rect | Sprite){    
            super(rigidBody);
            this.v = new Vector2(0,0);
            this.hasRigidBody = true;
            this.vHelper = new Vector2();
            this.velocity = 5;
            this.shape = shape; //new Rect(ctx, construct);
        }
        abstract getNewState(progress: number)
        protected placeOnTheGrid(moving: boolean){
           // window.game.grid.positionActor(this.shape.pos, this.v, this, moving);
        }
        
    }
}