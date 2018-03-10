module WSA {

    export interface SpriteConstruct {
        pos: Vector2
        context: CanvasRenderingContext2D
        width: number
        height: number
        image: HTMLImageElement
        ticksPerFrame: number
        numberOfFrames: number
    }
    export interface ISprite {
        pos: Vector2
        update()
        draw()
    }
    export class Sprite {
        pos: Vector2;
        height: number;
        width: number;
        private image: any;
        private context: any;
        private frameIndex = 0;
        private tickCount = 0;
        private ticksPerFrame;
        private numberOfFrames;

        constructor(options:SpriteConstruct) {
            this.pos = options.pos;
            this.context = options.context;
            this.width = options.width;
            this.height = options.height;
            this.image = options.image;
            this.ticksPerFrame = options.ticksPerFrame || 0;
            this.numberOfFrames = options.numberOfFrames || 1;
        }
        update() {
            this.tickCount += 1;

            if (this.tickCount > this.ticksPerFrame) {
                this.tickCount = 0;

                // If the current frame index is in range
                if (this.frameIndex < this.numberOfFrames - 1) {
                    // Go to the next frame
                    this.frameIndex += 1;
                } else {
                    this.frameIndex = 0;
                }
            }
        };

        draw() {
            // Draw the animation
            let frameWidth =  this.width / this.numberOfFrames;
            this.context.drawImage(
                this.image,
                3 + (this.frameIndex * this.width),
                0,
                this.width,
                this.height,
                this.pos.x,
                this.pos.y,
                this.width,
                this.height
            );
        };
    }
}