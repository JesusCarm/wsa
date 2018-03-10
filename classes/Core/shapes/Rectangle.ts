module WSA {    

    export interface IRectangleConstruct {
        pos: Vector2
        width: number
        height: number
        fillStyle?: string
        lineWidth?: number
        strokeStyle?: string
    }

    export interface IRectangle extends IRectangleConstruct{
        pos: Vector2
        draw(): void
        update()
    }

    export class Rect implements IRectangle {        
        // public x: number;
        // public y: number;
        public width: number;
        public height: number;
        public fillStyle: string;
        public lineWidth: number;
        public strokeStyle: string;
        public pos: Vector2;

        constructor(private ctx: CanvasRenderingContext2D, construct: IRectangleConstruct){
            // this.x = construct.x;
            // this.y = construct.y;
            this.pos = construct.pos;//new Vector2(construct.x,construct.y);
            this.width = construct.width;
            this.height = construct.height;
            this.fillStyle = construct.fillStyle;
            this.lineWidth = construct.lineWidth;
            this.strokeStyle = construct.strokeStyle;
        }

        public draw(){
            this.ctx.beginPath();
            this.ctx.rect(this.pos.x, this.pos.y, this.width, this.height);
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
        public update(){}
    }
}