module WSA {    

    export interface IRectangleConstruct {
        x: number
        y: number
        width: number
        height: number
        fillStyle?: string
        lineWidth?: number
        strokeStyle?: string
    }

    export interface IRectangle extends IRectangleConstruct{
        draw(): void
    }

    export class Rect implements IRectangle {        
        public x: number;
        public y: number;
        public width: number;
        public height: number;
        public fillStyle: string;
        public lineWidth: number;
        public strokeStyle: string;

        constructor(private ctx: CanvasRenderingContext2D, construct: IRectangleConstruct){
            this.x = construct.x;
            this.y = construct.y;
            this.width = construct.width;
            this.height = construct.height;
            this.fillStyle = construct.fillStyle;
            this.lineWidth = construct.lineWidth;
            this.strokeStyle = construct.strokeStyle;
        }

        public draw(){
            this.ctx.beginPath();
            this.ctx.rect(this.x, this.y, this.width, this.height);
            if(this.fillStyle){
                this.ctx.fillStyle = this.fillStyle;
                this.ctx.fill();
            }
            if(this.lineWidth || this.strokeStyle){
                if(this.lineWidth) this.ctx.lineWidth = this.lineWidth;
                if(this.strokeStyle) this.ctx.strokeStyle = this.strokeStyle;
                this.ctx.stroke();
            }   
        }
    }
}