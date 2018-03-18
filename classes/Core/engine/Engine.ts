/// <reference path="../canvas/Canvas.ts" />
module WSA {
    export interface IEngine{
        // update(): void
        // resolveCollisions(): void
        // draw(): void
        //loop(timestamp: number): void
        start():void
        registerBody(body:Matter.Body)
        // registerEntity(entity: IEntity):void
        // registerMovingEntity(entity: IEntity):void
        // registerRigidEntity(entity:IRigidEntity): void
    }

    export class Engine implements IEngine {
        private lastRender: number = 0;
        private progress: number = 0;
        private entities: IEntity[];
        private collisionResolver: ICollisionResolver;
        private idCounter: number;
        private movingEntities: IEntity[];
        private rigidEntities: IRigidEntity[];
        private matter: InitMatter;

        constructor(){
            this.matter = new InitMatter();
            // this.idCounter = 0;
            // this.entities = [];
            // this.movingEntities = [];
            // this.rigidEntities = [];
            // this.collisionResolver = new CollisionResolver();
        }

        start(): void {
            this.initWorldBounds();            
            //this.initEntities();
            //window.requestAnimationFrame(this.loop)
        }

        // loop = (timestamp: number): void => {
        //     this.progress = (timestamp - this.lastRender) / 16;
        //     this.eraseCanvas();
        //     this.resetActorPositions();
        //     this.getNewState();
        //     this.resolveCollisions();
        //     this.update();
        //     this.draw();
        //     this.lastRender = timestamp;
            
        //     window.requestAnimationFrame(this.loop);
        // }

        private initWorldBounds(){
            this.matter.addMatterComposite([
                // walls
                Matter.Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
                Matter.Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
                Matter.Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
                Matter.Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
            ])
        }

        // private initEntities(): void {
        //     this.entities.forEach(entity => {
        //         entity.init();
        //     });
        //     this.rigidEntities.forEach(entity => {
        //         entity.init();
        //     });
        //     this.movingEntities.forEach(entity => {
        //         entity.init();
        //     });
        // }

        // private getNewState():void{
        //     this.movingEntities && this.movingEntities.forEach((entity: IActor) => {
        //         entity.getNewState(this.progress);
        //     });
        // }

        // private update(): void {
        //     this.movingEntities.forEach(entity => {
        //         entity.update();
        //     });
        // }

        // private resolveCollisions(): void{
        //     this.collisionResolver.checkCollisions(this.movingEntities);
        // }

        // private draw(): void {
        //     this.entities.forEach(entity => {
        //         entity.draw();
        //     });
        //     this.rigidEntities.forEach(entity => {
        //         entity.draw();
        //     });
        //     this.movingEntities.forEach(entity => {
        //         entity.draw();
        //     });
        // }

        // private resetActorPositions(){
        //     window.game.grid.emptyActorsGrid();
        // }

        registerBody(body:Matter.Body){
            this.matter.addMatterComposite(body);
        }

        // registerRigidEntity(entity:IRigidEntity){
        //     this.rigidEntities.push(entity);
        // }

        // registerMovingEntity(entity: IEntity):void{
        //     this.movingEntities.push(entity);
        // }

        // registerEntity(entity: IEntity):void {
        //     entity.id = this.idCounter++;
        //     this.entities.push(entity);
        // }

        // registerForce(force){
        //     return force;
        // }

        // eraseCanvas(): void{
        //     this.canvas.clear();
        // }
    }
}