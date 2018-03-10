/// <reference path="../controllers/Keyboard.ts" />
/// <reference path="RigidStaticEntity.ts" />

module WSA {
    export class Box extends RigidStaticEntity implements IRigidStaticEntity{
        
        constructor(ctx: CanvasRenderingContext2D, construct: IRectangleConstruct, rigidBody: IRigidBody){
            super(rigidBody);
            this.hasRigidBody = true;
            this.shape = new Rect(ctx, construct);
            this.update();
        }
        getNewState(progress:number){
            progress;
        }
        
        draw(): void{
            this.shape.draw();
        }

        update():void{
            this.updateRigidBodyCoords(this.shape.pos);
        }

        resolveCollision(){
        }
    }
}