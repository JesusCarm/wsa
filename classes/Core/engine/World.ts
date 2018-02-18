module WSA {
    export interface IWorld{
        registerEntity(entity:IEntity): void
        registerForce(force)
    }
    export class World implements IWorld{
        private engine: IEngine;
        constructor(canvas: ICanvas){
            this.engine = new Engine(canvas);
            this.engine.start();
        }
        
        registerEntity(entity:IEntity): void{
            this.engine.registerEntity(entity);
        }
        registerForce(force){

        }
    }
}