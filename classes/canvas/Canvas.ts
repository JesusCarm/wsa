module WSA {

    export interface ICanvas {
        init(body: HTMLBodyElement)
        getContext():CanvasRenderingContext2D
        getCanvas():HTMLCanvasElement
        clear(): void
    }

    export class Canvas implements ICanvas {

        private canvas: HTMLCanvasElement;

        constructor(){
            this.canvas = this.createCanvas();
        }

        public init(body: HTMLBodyElement){            
            body.appendChild(this.canvas);
        }

        public getCanvas():HTMLCanvasElement{
            return this.canvas;
        }

        public getContext():CanvasRenderingContext2D {
            return this.canvas.getContext('2d');
        }

        public clear(){
            this.getContext().clearRect(0, 0, this.canvas.width, this.canvas.height);
        }

        private createCanvas(){
            return document.createElement("canvas");
        }
    }
}