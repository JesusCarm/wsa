module WSA {
    export interface IWorld{
        engine: IEngine;
        registerEntity(entity:IEntity): void
        registerForce(force)
        registerRigidEntity(entity:IRigidEntity)
        registerMovingEntity(entity:IActor)
    }
    export class World implements IWorld{
        public engine: IEngine;
        constructor(canvas: ICanvas){
            this.engine = new Engine(canvas);
        }
        
        registerEntity(entity:IEntity): void{
            this.engine.registerEntity(entity);
        }
        registerForce(force: number){
            force;
        }
        registerRigidEntity(entity:IRigidEntity){   
            this.engine.registerRigidEntity(entity);
        }
        registerMovingEntity(entity:IActor){
            this.engine.registerMovingEntity(entity);
        }
    }
}