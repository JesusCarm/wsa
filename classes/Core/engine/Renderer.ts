/// <reference path="../../../lib/matter-js-0.10.0/matter-js/index.d.ts" />
module WSA {
    export enum Layer { background, floor, ground, foreground, air };
    
    export class Renderer {
    
        private entities: IEntity[][];

        constructor(){
           
        }

        update(){

        }

        registerEntity(entity: IEntity, z: Layer){
            this.entities[z].push(entity);
        }

    }
}