/// <reference path="../../Core/controllers/Keyboard.ts" />
/// <reference path="../../Core/engine/Vector/Vector2.ts" />
/// <reference path="../../Core/entities/Actor.ts" />

module WSA.Platform {

    export interface IPlayer extends IActor {
        life: number
        isStatic: boolean;
    }

    export class Player extends Actor implements IPlayer{
        debugging: boolean;
        debugControls: { top: HTMLInputElement; left: HTMLInputElement; bottom: HTMLInputElement; right: HTMLInputElement; };
        intersection: Vector2;
        isStatic: boolean;
        public life: number;
        protected velocity: number;
        private isJumping: boolean;

        constructor(private controller: IKeyboard, private ctx: CanvasRenderingContext2D, construct: IRectangleConstruct, rigidBody: IRigidBody, life:number){
            super(rigidBody,ctx,construct);
            //this.debugFunction();
            this.controller.init();
            this.life = life;
            this.isJumping = false;
            this.update();
        }   

        getNewState(progress:number){
            let pressedKeys = this.controller.getKeys();
            if(this.debugging){
                this.v.x = parseInt(this.debugControls.left.value);
                this.v.y =  parseInt(this.debugControls.top.value);
               // this.resetInputs(); 
            }else{
                this.inputVector(pressedKeys,progress);
            }
            if(Vector2.ZERO.equals(this.v)){
                this.isStatic = true;
            }
            this.placeOnTheGrid();
            
            //this.saveState();
           // this.inputVector(pressedKeys,progress);
            
        }     

        draw(): void{
            this.shape.draw();
            if(this.intersection){
                let rectConstruct: IRectangleConstruct = {
                    pos: this.intersection,
                    width: 2,
                    height: 2,
                    fillStyle: "red"
                }
                let intersection = new Rect(this.ctx, rectConstruct);
                intersection.draw();
            }
        }

        resolveCollision(targetEntity: IRigidEntity){
            
            if(targetEntity.rigidBody.bodyType === rigidBodyType.wall){
                this.isJumping = false;
                this.getIntersection(targetEntity);
            } else if(targetEntity.rigidBody.bodyType === rigidBodyType.weapons){
                this.life--;
                console.log(this.life);
            }
            this.colliding = false;
        }
        getIntersection(targetEntity: IRigidEntity){
             // a1 is line1 start, a2 is line1 end, b1 is line2 start, b2 is line2 end
            let targetBounds = targetEntity.rigidBody.bounds;
            let tl = new Vector2(targetBounds.l, targetBounds.t);
            let bl = new Vector2(targetBounds.l, targetBounds.b);
            let finalPos = this.vHelper.add(this.rigidBody.center, this.v);
            finalPos.x += this.rigidBody.width/2;
            this.intersection = Vector2.intersection(this.rigidBody.center, finalPos, tl, bl);
        }

        update():void{
           
            this.updateShapePosition();
            this.updateRigidBodyCoords({
                l: this.shape.pos.x,
                r: this.shape.pos.x + this.shape.width,
                t: this.shape.pos.y,
                b: this.shape.pos.y + this.shape.height
            });
        }
        protected inputVector(pressedKeys: IPressedKeys, progress: number){
            // user attempt to move the object
            let p = progress * this.velocity;
            p = Math.min(p, 500);
            this.v.x = pressedKeys.left ? -1*p : pressedKeys.right ? 1*p  : 0;            
            this.v.y = pressedKeys.up ? -1*p : pressedKeys.down ? 1*p  : 0;
            if(this.v.y > 0) return;
            if(pressedKeys.space) this.v.y = -3*p;
        }
        protected updateShapePosition(){
            if(this.debugging){
                this.shape.pos = new Vector2(parseInt(this.debugControls.left.value),parseInt(this.debugControls.top.value));
            }else{
                this.shape.pos = this.shape.pos.add(this.v);
            }
        }
        private debugFunction(){
            this.debugging = true;
            this.debugControls = {
                top: <HTMLInputElement>document.getElementById("top"),
                left: <HTMLInputElement>document.getElementById("left"),
                bottom: <HTMLInputElement>document.getElementById("bottom"),
                right: <HTMLInputElement>document.getElementById("right")
            }
        }
        resetInputs(){
            this.debugControls.left.value = "0";
            this.debugControls.top.value = "0";
            this.debugControls.right.value = "0";
            this.debugControls.bottom.value = "0";
        }

    }
}