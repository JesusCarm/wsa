module WSA {

    export interface IPlayer extends IEntity{

    }

    export class Player extends Entity implements IPlayer{
        private shape: IRectangle;
        private velocity: number;

        constructor(private controller: IKeyboard, ctx: CanvasRenderingContext2D, construct: IRectangleConstruct){
            super();
            this.velocity = 5;
            this.shape = new Rect(ctx, construct);
            this.controller.init();
        }
        
        draw(): void{
            this.shape.draw();
        }

        update(progress: number):void{
            let pressedKeys = this.controller.getKeys();
            this.updateShape(pressedKeys, progress);
        }

        private updateShape(pressedKeys:IPressedKeys, progress: number){
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
    }
}