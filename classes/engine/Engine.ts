module WSA {
    export interface IEngine{
        update(): void
        draw(): void
        loop(timestamp: number): void
        start():void
        registerEntity(entity: IEntity):void
    }

    export class Engine implements IEngine {
        private lastRender: number = 0;
        private progress: number = 0;
        private entities: IEntity[];

        constructor(private canvas: ICanvas){
            this.entities = [];
        }

        start(): void {
            window.requestAnimationFrame(this.loop)
        }

        loop = (timestamp: number): void => {
            this.progress = (timestamp - this.lastRender) / 16;
            this.update();
            this.eraseCanvas();
            this.draw();
            this.lastRender = timestamp;
            
            window.requestAnimationFrame(this.loop);
        }

        update(): void {
            this.entities.forEach(entity => {
                entity.update(this.progress);
            });
        }

        draw(): void {
            this.entities.forEach(entity => {
                entity.draw();
            });
        }

        registerEntity(entity: IEntity):void {
            this.entities.push(entity);
        }

        eraseCanvas(): void{
            this.canvas.clear();
        }
    }
}