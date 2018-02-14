module WSA {
    export interface IDriver{
        registerEntity(entity:IEntity): void
    }
    export class Driver implements IDriver{
        private engine: IEngine;
        constructor(canvas: ICanvas){
            this.engine = new Engine(canvas);
            this.engine.start();
        }
        
        registerEntity(entity:IEntity): void{
            this.engine.registerEntity(entity);
        }
    }
}