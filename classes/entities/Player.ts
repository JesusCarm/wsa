/// <reference path="../controllers/Keyboard" />
module WSA {

    export interface IPlayer extends IRigidEntity{

    }

    export class Player extends RigidEntity implements IPlayer{
        private shape: IRectangle;
        private velocity: number;

        constructor(private controller: IKeyboard, ctx: CanvasRenderingContext2D, construct: IRectangleConstruct, rigidBody: IRigidBody){
            super(rigidBody);
            this.hasRigidBody = true;
            this.velocity = 5;
            this.shape = new Rect(ctx, construct);
            this.controller.init();
        }
        
        draw(): void{
            this.shape.draw();
        }

        update(progress: number):void{
            let pressedKeys = this.controller.getKeys();
            this.updateShapePosition(pressedKeys, progress);
            this.updateRigidBody();
        }

        private updateShapePosition(pressedKeys:IPressedKeys, progress: number){
            let p = progress * this.velocity;
            if(pressedKeys.down){
                this.shape.y += p;
            }else if(pressedKeys.up){
                this.shape.y -= p;
            }
            if(pressedKeys.right){
                this.shape.x += p;
            }else if(pressedKeys.left){
                this.shape.x -= p;
            }
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