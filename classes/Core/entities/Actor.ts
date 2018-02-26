module WSA {
    export interface IActor extends IRigidEntity{
        getNewState(progress: number)
        shape: Rect;
        //vHelper: Vector2;
        id: number;
        //rigidBody: IRigidBody;
        //colliding: boolean;
        //hasRigidBody: boolean;
        v: Vector2;
    }

    export abstract class Actor  extends RigidEntity implements IActor{

        shape: Rect;
        vHelper: Vector2;
        id: number;
        rigidBody: IRigidBody;
        colliding: boolean;
        hasRigidBody: boolean;
        v: Vector2;
        protected velocity: number;

        constructor(rigidBody: IRigidBody, ctx: CanvasRenderingContext2D, construct: IRectangleConstruct){    
            super(rigidBody);
            this.v = new Vector2(0,0);
            this.hasRigidBody = true;
            this.vHelper = new Vector2();
            this.velocity = 5;
            this.shape = new Rect(ctx, construct);
        }
        abstract getNewState(progress: number)
        placeOnTheGrid(){
            if(this.v.equals(Vector2.ZERO)) return;
            window.game.grid.positionActor(this.shape.pos, this.v, this);
            // let diffPos = window.game.grid.positionActor(this.shape.pos, this.v, this);
            // if(diffPos){
            //     this.v = new Vector2(diffPos.dx, diffPos.dy);
                
            //     console.log(this.v);
            // }
        }
        
    }
}