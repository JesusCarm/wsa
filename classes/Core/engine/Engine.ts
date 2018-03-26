/// <reference path="../canvas/Canvas.ts" />
module WSA {
    export interface IEngine{
        context: CanvasRenderingContext2D
        start():void
        registerActor(actor: IActor)
        registerBody(body:Matter.Body)
    }

    export class Engine implements IEngine {
        private lastRender: number = 0;
        private progress: number = 0;
        private entities: IEntity[];
        private idCounter: number;
        private movingEntities: IEntity[];
        private rigidEntities: IRigidEntity[];
        private matter: InitMatter;
        context: CanvasRenderingContext2D;

        constructor(){
            this.matter = new InitMatter();
            this.context = this.matter.canvas.getContext("2d");
        }

        start(): void {
            this.initWorldBounds();            
        }

        private initWorldBounds(){
            this.matter.registerComposite([
                // walls
                Matter.Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
                Matter.Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
                Matter.Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
                Matter.Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
            ])
        }
        registerActor(actor: IActor){
            this.matter.registerActor(actor);
        }
        registerBody(body:Matter.Body){
            this.matter.registerComposite(body);
        }

    }
}