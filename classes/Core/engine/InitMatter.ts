/// <reference path="../../../lib/matter-js-0.10.0/matter-js/index.d.ts" />
module WSA {
    export interface IWSAMatter {
        engine: Matter.Engine;
        render: Matter.Render;
        world: Matter.World;
        runner: Matter.Runner;        
        Composites: Matter.Composites;
    }
    export class InitMatter {
        private Engine = Matter.Engine;
        private Render = Matter.Render;
        private Runner = Matter.Runner;
        Composites = Matter.Composites;
        //Common = Matter.Common,
        private MouseConstraint = Matter.MouseConstraint;
        private Mouse = Matter.Mouse;
        private World = Matter.World;
        private Bodies = Matter.Bodies;

        engine: Matter.Engine;
        render: Matter.Render;
        world: Matter.World;
        //runner: Matter.Runner;
        canvas: HTMLCanvasElement;
        loop: ILoop;

        constructor(){
            // create engine
            let noGravity: any = Matter.Vector.create(0,0);
            noGravity.scale = 0;

            let wroldDef: Matter.IWorldDefinition = {
                gravity: noGravity
            }
            let engineDef: Matter.IEngineDefinition = {
                world: Matter.World.create(wroldDef)
            }
            this.engine = this.Engine.create(engineDef),
            this.world = this.engine.world;

            // create renderer
            this.render = this.Render.create({
                element: document.body,
                engine: this.engine,
                options: {
                    width: 800,
                    height: 600,
                    //showAngleIndicator: true
                }
            });
            this.Render.run(this.render);

            // create loop
            this.loop = new Loop();
            // this.runner = this.Runner.create({});
            // this.Runner.run(this.runner, this.engine);
            this.loop.run(this.engine);
            this.canvas = this.render.canvas;
        }

        addMatterComposite (bodies: any){
            this.World.add(this.world, bodies);
        }
        
        stop() {
            Matter.Render.stop(this.render);
            this.loop.stop();
        }
    }
}