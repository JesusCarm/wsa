/// <reference path="../controllers/Keyboard" />
module WSA {

    export class Box extends RigidEntity implements IRigidEntity{
        
        constructor(ctx: CanvasRenderingContext2D, construct: IRectangleConstruct, rigidBody: IRigidBody){
            super(rigidBody);
            this.hasRigidBody = true;
            this.shape = new Rect(ctx, construct);
        }
        
        draw(): void{
            this.shape.draw();
        }

        update(progress: number):void{
            progress;
            this.updateRigidBodyBounds({
                l: this.shape.x,
                r: this.shape.x + this.shape.width,
                t: this.shape.y,
                b: this.shape.y + this.shape.height
            });
        }

        resolveCollision(){
        }
    }
}