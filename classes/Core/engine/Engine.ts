/// <reference path="../canvas/Canvas.ts" />
module WSA {
    export interface IEngine{
        update(): void
        resolveCollisions(): void
        draw(): void
        loop(timestamp: number): void
        start():void
        registerEntity(entity: IEntity):void
    }

    export class Engine implements IEngine {
        private lastRender: number = 0;
        private progress: number = 0;
        private entities: IEntity[];
        private collisionResolver: ICollisionResolver;
        private idCounter: number;

        constructor(private canvas: ICanvas){
            this.idCounter = 0;
            this.entities = [];
            this.collisionResolver = new CollisionResolver();
        }

        start(): void {
            window.requestAnimationFrame(this.loop)
        }

        loop = (timestamp: number): void => {
            this.progress = (timestamp - this.lastRender) / 16;
            this.update();
            this.eraseCanvas();
            this.resolveCollisions();
            this.draw();
            this.lastRender = timestamp;
            
            window.requestAnimationFrame(this.loop);
        }

        update(): void {
            this.entities.forEach(entity => {
                entity.update(this.progress);
            });
        }

        resolveCollisions(): void{
            this.collisionResolver.checkCollisions(this.entities);
            // this.entities.forEach((entity: IRigidEntity) => {
            //     entity.resolveCollision();
            // });
        }

        draw(): void {
            this.entities.forEach(entity => {
                entity.draw();
            });
        }

        registerEntity(entity: IEntity):void {
            entity.id = this.idCounter++;
            this.entities.push(entity);
        }

        registerForce(force){
            
        }

        eraseCanvas(): void{
            this.canvas.clear();
        }
    }
}