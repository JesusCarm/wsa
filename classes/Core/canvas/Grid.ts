/// <reference path="../engine/Vector/Vector2.ts" />
module WSA {
    export interface IGrid {
        positionStaticElement(pos: Vector2, rigidEntity: IRigidEntity)
        positionActor(pos: Vector2, v: Vector2, actor: IActor): {dx: number, dy: number}
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

        }

        positionStaticElement(pos: Vector2, rigidEntity: IRigidEntity){
            let x = pos.getX(),
                y = pos.getY();
            let x1 = x >= 32 ? Math.floor(x / 32) : 0;
            let y1 = y >= 32 ? Math.floor(y / 32) : 0;
            this.addElementToGrid(this.grid, x1,y1,rigidEntity);
        }

        positionActor(pos: Vector2, v: Vector2, actor: IActor):{dx: number, dy: number}{
            let v2 = pos.add(pos,v),
                x1 = v2.getX(),
                y1 = v2.getY();
            let areaX = x1 / 32;
            let areaY = y1 / 32;
            let ax = Math.floor(areaX);
            let ay = Math.floor(areaY);
            let offsetX = areaX - ax;
            let offsetY = areaY - ay;

            let diffs:{dx: number, dy: number}[] = [];
            let populatedAreas:IRigidBody[] = [];
            this.getPopulatedArea(ax,ay,populatedAreas);
            // if(this.grid[ax] && this.grid[ax][ay]) populatedAreas.push(this.grid[ax][ay]);
            // this.checkStaticPosition(diffs, ax, ay, actor)

            if(offsetX !== 0){
                this.getPopulatedArea(ax+1,ay,populatedAreas);
                //this.checkStaticPosition(diffs, ax + 1, ay, actor);
            } 
            if(offsetY !== 0){
                this.getPopulatedArea(ax,ay+1,populatedAreas);
                //this.checkStaticPosition(diffs, ax, ay + 1, actor);
            }
            if(offsetX !== 0 && offsetY !== 0){
                this.getPopulatedArea(ax+1,ay+1,populatedAreas);
                //this.checkStaticPosition(diffs, ax + 1, ay + 1, actor);
            }
            getClosestArea()
            if(diffs.length){
                return diffs.reduce((prev,current)=>{
                    return {
                        dy: Math.abs(prev.dy) >= Math.abs(current.dy) ? current.dy : prev.dy,
                        dx: Math.abs(prev.dx) >= Math.abs(current.dx) ? current.dx : prev.dx
                    }
                });
            } else 
            return null;            
        }
        private getPopulatedArea(ax,ay,populatedAreas){
            if(this.grid[ax] && this.grid[ax][ay]) populatedAreas.push(this.grid[ax][ay]);
        }
        private getClosestArea(actor:IActor,populatedAreas:IRigidBody[]){
            let actorCenter = actor.rigidBody.center;
            populatedAreas.forEach((area)=>{
                let distance = this.vector2.
                let areaCenter = area.center;
                areaCenter.
            });
            return populatedAreas.map((area)=>{
                let areaCenter = area.center;
                areaCenter.
            });
        }
        private checkStaticPosition(diffs, ax, ay, actor){
            if(this.grid[ax] && this.grid[ax][ay]) diffs.push(this.resolveCollitionActorStaticEntity(actor, this.grid[ax][ay]));
            else this.addElementToGrid(this.actorsGrid, ax, ay, actor);
        }
        private addElementToGrid(grid:Array<IRigidEntity>[], x: number, y: number,rigidEntity: IRigidEntity){
            if(grid[x]) grid[x][y] = rigidEntity;
            else console.log('no entry on the grid');
        }
        private createEmptyGrid(){
            let ARRAY_SIZE = (this.size.w / this.gridUnit)+1;
            let a = new Array(ARRAY_SIZE);
            for (var i = 0; i < ARRAY_SIZE; i++) {
                a[i] = [];
            }
            return a;
        }
        private resolveCollitionActorStaticEntity(actor: IActor, rigidEntity: IRigidEntity){
             let dy = actor.v.y,
                 dx = actor.v.x;
            let bounds = rigidEntity.rigidBody.bounds;
            let actorBounds = actor.rigidBody.bounds;      
            
            let c1 = rigidEntity.rigidBody.center,
                c2 = actor.rigidBody.center;

            if(Math.abs(c1.x - c2.x) > Math.abs(c1.y - c2.y)){
                // horizontal collision
                //console.log('horizontal collision');
                if(actorBounds.l >= bounds.r){
                    // actor is at the right
                    dx = bounds.r - actorBounds.l;
                }else if(actorBounds.r <= bounds.l){
                    // actor is at the left
                    dx = bounds.l - actorBounds.r;
                }
            } else{
                // vertical collision
                //console.log('vertical collision');
                if(actorBounds.t >= bounds.b){
                    // actor is at the bottom
                    dy = bounds.b - actorBounds.t;
                } else if(actorBounds.b <= bounds.t){
                    // actor is at the top
                    dy = bounds.t - actorBounds.b;
                }
            }

            return {
                dy: dy,
                dx: dx
            }          
        }
    }
}