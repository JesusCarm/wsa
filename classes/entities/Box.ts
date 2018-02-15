/// <reference path="../controllers/Keyboard" />
module WSA {

    export class Box extends RigidEntity implements IRigidEntity{
        private shape: IRectangle;

        constructor(ctx: CanvasRenderingContext2D, construct: IRectangleConstruct, rigidBody: IRigidBody){
            super(rigidBody);
            this.hasRigidBody = true;
            this.shape = new Rect(ctx, construct);
            this.updateRigidBody();
        }
        
        draw(): void{
            this.shape.draw();
        }

        update(progress: number):void{
            progress;
            //this.updateRigidBody();
        }

        private updateRigidBody(){
            this.rigidBody.bounds = {
                l: this.shape.x,
                r: this.shape.x + this.shape.width,
                t: this.shape.y,
                b: this.shape.y + this.shape.height
            }
        }
    }
}