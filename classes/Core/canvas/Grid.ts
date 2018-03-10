/// <reference path="../engine/Vector/Vector2.ts" />
module WSA {
    export interface IGrid {
        positionStaticElement(pos: Vector2, rigidEntity: IRigidEntity)
        positionActor(pos: Vector2, v: Vector2, actor: IActor, moving: boolean): {dx: number, dy: number}
        emptyActorsGrid()
    }
    export class Grid {
        private actorsGrid: Array<IActor >[];
        private gridUnit = 32;
        private grid: Array<IRigidEntity>[];
        private vector2: Vector2;
        constructor(private size:{w:number, h:number}){
            this.grid = this.createEmptyGrid();
            this.actorsGrid = this.createEmptyGrid();
            this.vector2 = new Vector2();
        }

        emptyActorsGrid(){
            this.actorsGrid = this.createEmptyGrid();
        }

        positionStaticElement(pos: Vector2, rigidEntity: IRigidEntity){
            let x = pos.getX(),
                y = pos.getY();
            let x1 = x >= 32 ? Math.floor(x / 32) : 0;
            let y1 = y >= 32 ? Math.floor(y / 32) : 0;
            this.addElementToGrid(this.grid, x1,y1,rigidEntity);
        }

        positionActor(pos: Vector2, v: Vector2, actor: IActor, moving: boolean){            
            let v2 = this.vector2.add(pos,v);
            let actorArea = {
                x: v2.x / 32,
                y: v2.y /32
            };
            let ax = Math.floor(actorArea.x),
                ay = Math.floor(actorArea.y);
            if(moving){
                let offset = {
                    x: actorArea.x - ax,
                    y: actorArea.y - ay
                }
                let populatedAreas = this.getPopulatedAreas(ax,ay,offset);
              
                if(populatedAreas.length){
                    let closest = this.getClosestArea(actor, populatedAreas);
                    this.resolveCollision(actor, closest.pop());
                    if(populatedAreas.length){
                        this.positionActor(actor.shape.pos, actor.v, actor, true);
                    }
                    v2 = this.vector2.add(pos, actor.v);
                    actorArea = {
                        x: v2.x / 32,
                        y: v2.y /32
                    };
                    ax = Math.floor(actorArea.x);
                    ay = Math.floor(actorArea.y);
                }
            } 
            this.setActorPosition(actor, ax, ay);     
        }

        private setActorPosition(actor: IActor, ax:number, ay: number){
            this.actorsGrid[ax] = [];
            this.actorsGrid[ax][ay] = actor;
        }

        private getPopulatedAreas(ax:number, ay: number, offset: {x: number, y: number}):IRigidEntity[] {
            let populatedAreas:IRigidEntity[] = [];
            this.getPopulatedArea(ax,ay,populatedAreas);

            if(offset.x !== 0){
                this.getPopulatedArea(ax+1,ay,populatedAreas);
            } 
            if(offset.y !== 0){
                this.getPopulatedArea(ax,ay+1,populatedAreas);
            }
            if(offset.x !== 0 && offset.y !== 0){
                this.getPopulatedArea(ax+1,ay+1,populatedAreas);
            }
            return populatedAreas;
        }

        private getPopulatedArea(ax,ay,populatedAreas){
            if(this.grid[ax] && this.grid[ax][ay]) populatedAreas.push(this.grid[ax][ay]);
        }

        private getClosestArea(actor:IActor,populatedAreas:IRigidEntity[]): IRigidEntity[]{
            let actorCenter = actor.rigidBody.center;            
            let closest: any = [];
            let currentDistance;
            populatedAreas.forEach((current)=>{                
                let distance = Vector2.distance(current.rigidBody.center, actorCenter);
                if(currentDistance) {
                    if(distance < currentDistance){
                        currentDistance = distance;
                        closest = [];
                        closest.push(current);
                    }else if(distance === currentDistance){
                        closest.push(current);
                    }
                }
                else {
                    currentDistance = distance;
                    closest.push(current);
                }
            });
            return closest;
        }
        
        private addElementToGrid(grid:Array<IRigidEntity>[], x: number, y: number,rigidEntity: IRigidEntity){
            if(grid[x]) grid[x][y] = rigidEntity;
            else console.log('no entry on the grid');
        }
        private createEmptyGrid(){
            let ARRAY_SIZE = Math.floor(this.size.w / this.gridUnit)+1;
            let a = new Array(ARRAY_SIZE);
            for (var i = 0; i < ARRAY_SIZE; i++) {
                a[i] = [];
            }
            return a;
        }
        private resolveCollision(actor: IActor, rigidEntity: IRigidEntity){
            let c1 = rigidEntity.rigidBody.center,
                c2 = actor.rigidBody.center,
                actorV = actor.v;

            if(Math.abs(c1.x - c2.x) > Math.abs(c1.y - c2.y)){
                actorV.x = this.resolveHorizontalCollision(actor, rigidEntity);
            } else{
                actorV.y = this.resolveVerticalCollision(actor, rigidEntity);                  
            }
        }
        private resolveHorizontalCollision(actor: IActor, rigidEntity: IRigidEntity): number{
            let dx = actor.v.x;
            let bounds = rigidEntity.rigidBody.bounds;
            let actorBounds = actor.rigidBody.bounds;    

           if(actorBounds.l >= bounds.r){
               // actor is at the right
               return bounds.r - actorBounds.l;
           }else if(actorBounds.r <= bounds.l){
               // actor is at the left
               return bounds.l - actorBounds.r;
           }
           return dx;       
        }
        private resolveVerticalCollision(actor: IActor, rigidEntity: IRigidEntity): number{
            let dy = actor.v.y;
            let bounds = rigidEntity.rigidBody.bounds;
            let actorBounds = actor.rigidBody.bounds;    

            if(actorBounds.t >= bounds.b){
                // actor is at the bottom
                return bounds.b - actorBounds.t;
            } else if(actorBounds.b <= bounds.t){
                // actor is at the top
                return bounds.t - actorBounds.b;
            }
            return dy;       
        }
       
    }
}