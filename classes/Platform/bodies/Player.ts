/// <reference path="../../Core/controllers/Keyboard.ts" />
/// <reference path="../../Core/engine/Vector/Vector2.ts" />
/// <reference path="../../Core/entities/Actor.ts" />

module WSA.Platform {

    export interface IPlayer extends IActor {
        life: number
        isStatic: boolean;
    }

    export class Player extends Actor implements IPlayer{
        sprite: Sprite;
        debugControls: { top: HTMLInputElement; left: HTMLInputElement; bottom: HTMLInputElement; right: HTMLInputElement; };
        intersection: Vector2;
        isStatic: boolean;
        public life: number;
        protected velocity: number;
        private isJumping: boolean;

        constructor(private controller: IKeyboard, private ctx: CanvasRenderingContext2D, rigidBody: IRigidBody, life:number, shape: Sprite){
            super(rigidBody, shape);
            this.controller.init();
            this.life = life;
            this.isJumping = false;
            this.update();
        }   

        getNewState(progress:number){
            let pressedKeys = this.controller.getKeys();
            this.inputVector(pressedKeys,progress);
            if(Vector2.ZERO.equals(this.v)){
                this.isStatic = true;
            }
            this.placeOnTheGrid(this.isStatic);
        }     

        draw(): void{
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
            this.shape.draw();
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
            this.updateRigidBodyCoords(this.shape.pos);
            this.shape.update();
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
            this.shape.pos = this.shape.pos.add(this.v);
        }

    }
}