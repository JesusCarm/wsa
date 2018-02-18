/// <reference path="../../Core/controllers/Keyboard" />
module WSA.Platform {

    export interface IPlayer extends IRigidEntity {
        life: number
    }

    export interface IPlayerState extends IRigidEntityState {
        shape: IRectangle[]
        resolveCollision():void
    }

    export class Player extends RigidEntity implements IPlayer{
        public life: number;
        protected oldState: IPlayerState;
        private velocity: number;

        constructor(private controller: IKeyboard, ctx: CanvasRenderingContext2D, construct: IRectangleConstruct, rigidBody: IRigidBody, life:number){
            super(rigidBody);
            this.hasRigidBody = true;
            this.velocity = 1;
            this.shape = new Rect(ctx, construct);
            this.controller.init();
            this.life = life;
            this.oldState.shape = [];
        }

        resolveCollision(){
            if(!this.colliding) return;
            
            if(this.targetCollider.bodyType === rigidBodyType.wall){
                this.restoreState();
            } else if(this.targetCollider.bodyType === rigidBodyType.weapons){
                this.life--;
                console.log(this.life);
            }
            this.colliding = false;
            this.setTargetCollider(null);
        }

        update(progress: number):void{
            let pressedKeys = this.controller.getKeys();
            this.saveState();
            this.updateShapePosition(pressedKeys, progress);
            this.updateRigidBodyBounds({
                l: this.shape.x,
                r: this.shape.x + this.shape.width,
                t: this.shape.y,
                b: this.shape.y + this.shape.height
            });
        }

        protected saveState(){
            super.saveState();
            this.oldState.shape.push(Object.assign({},this.shape));
        }
        protected restoreState(){
            super.restoreState();
            Object.assign(this.shape,this.oldState.shape.pop())
            //this.shape = this.oldState.shape.pop();
        }
        protected updateShapePosition(pressedKeys:IPressedKeys, progress: number){
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