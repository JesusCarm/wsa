module WSA {

    export interface IRigidStaticEntity extends IRigidEntity {
        placeOnTheGrid():void
    }   

    export abstract class RigidStaticEntity extends RigidEntity implements IRigidStaticEntity {
        init(){
            this.placeOnTheGrid();
        }
        placeOnTheGrid(): void {
           // window.game.grid.positionStaticElement(this.shape.pos, this);
        }
    }
}