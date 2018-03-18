module WSA {
    var _requestAnimationFrame,
    _cancelAnimationFrame;

    if (typeof window !== 'undefined') {
        _requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;

        _cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame;
    }

    if (!_requestAnimationFrame) {
        var _frameTimeout;

        _requestAnimationFrame = function(callback){ 
            _frameTimeout = setTimeout(function() { 
                callback(window.performance.now()); 
            }, 1000 / 60);
        };

        _cancelAnimationFrame = function() {
            clearTimeout(_frameTimeout);
        };
    }

    export interface ILoopOptions {
        fps?: number,
        correction?: number,
        deltaSampleSize?: number,
        counterTimestamp?: number,
        frameCounter?: number,
        deltaHistory?: number[],
        timePrev?: number,
        timeScalePrev?: number,
        frameRequestId?: number,
        isFixed?: boolean,
        enabled?: boolean
    }
    export interface ILoop extends ILoopOptions {
        delta: number
        engine: Matter.Engine
        run(engine: Matter.Engine)
        stop()        
        start(engine: Matter.Engine)
    }

    export class Loop implements ILoop {
        fps;
        correction;
        deltaSampleSize;
        counterTimestamp;
        frameCounter;
        deltaHistory;
        timePrev;
        timeScalePrev;
        frameRequestId;
        isFixed;
        enabled;
        delta;
        deltaMin;
        deltaMax;
        engine;
        constructor(options?: ILoopOptions){
            this.fps = 60;
            this.correction = 1;
            this.deltaSampleSize = 60;
            this.counterTimestamp = 0;
            this.frameCounter = 0;
            this.deltaHistory = [];
            this.timePrev = null;
            this.timeScalePrev = 1;
            this.frameRequestId = null;
            this.isFixed = false;
            this.enabled = true;
            if(options){
                for (const key in options) {
                    if (options.hasOwnProperty(key)) {
                        if(options.hasOwnProperty(key)){
                            this[key] = options[key];
                        }                  
                    }
                }
            }
            this.delta = this.delta || 1000 / this.fps;
            this.deltaMin = this.deltaMin || 1000 / this.fps;
            this.deltaMax = this.deltaMax || 1000 / (this.fps * 0.5);
            this.fps = 1000 / this.delta;
        }
        run(engine) {
           this.engine = engine;
           this.render();
        };

        private render = (time?:number)=>{
            this.frameRequestId = _requestAnimationFrame(this.render);

            if (time && this.enabled) {
                this.tick(time);
            }
        }
        private tick(time) {
            var timing = this.engine.timing,
                correction = 1,
                delta;
    
            // create an event object
            var event = {
                timestamp: timing.timestamp
            };
    
            Matter.Events.trigger(this, 'beforeTick');
    
            if (this.isFixed) {
                // fixed timestep
                delta = this.delta;
            } else {
                // dynamic timestep based on wall clock between calls
                delta = (time - this.timePrev) || this.delta;
                this.timePrev = time;
    
                // optimistically filter delta over a few frames, to improve stability
                this.deltaHistory.push(delta);
                this.deltaHistory = this.deltaHistory.slice(-this.deltaSampleSize);
                delta = Math.min.apply(null, this.deltaHistory);
                
                // limit delta
                delta = delta < this.deltaMin ? this.deltaMin : delta;
                delta = delta > this.deltaMax ? this.deltaMax : delta;
    
                // correction for delta
                correction = delta / this.delta;
    
                // update this.engine timing object
                this.delta = delta;
            }
    
            // time correction for time scaling
            if (this.timeScalePrev !== 0)
                correction *= timing.timeScale / this.timeScalePrev;
    
            if (timing.timeScale === 0)
                correction = 0;
    
            this.timeScalePrev = timing.timeScale;
            this.correction = correction;
    
            // fps counter
            this.frameCounter += 1;
            if (time - this.counterTimestamp >= 1000) {
                this.fps = this.frameCounter * ((time - this.counterTimestamp) / 1000);
                this.counterTimestamp = time;
                this.frameCounter = 0;
            }
    
            Matter.Events.trigger(this, 'tick');
            // Events.trigger(this.engine, 'tick', event); // @deprecated
    
            // // if world has been modified, clear the render scene graph
            // if (this.engine.world.isModified 
            //     && this.engine.render
            //     && this.engine.render.controller
            //     && this.engine.render.controller.clear) {
            //     this.engine.render.controller.clear(this.engine.render); // @deprecated
            // }
    
            // update
            Matter.Events.trigger(this, 'beforeUpdate');
            Matter.Engine.update(this.engine, delta, correction);
            Matter.Events.trigger(this, 'afterUpdate');
    
            // render
            // @deprecated
            // if (this.engine.render && this.engine.render.controller) {
            //     Events.trigger(this, 'beforeRender', event);
            //     Events.trigger(this.engine, 'beforeRender', event); // @deprecated
    
            //     this.engine.render.controller.world(this.engine.render);
    
            //     Events.trigger(this, 'afterRender', event);
            //     Events.trigger(this.engine, 'afterRender', event); // @deprecated
            // }
    
            Matter.Events.trigger(this, 'afterTick');
        }
        stop() {
            _cancelAnimationFrame(this.frameRequestId);
        };
        
        start() {
            this.run(this.engine);
        };
    
    }
}