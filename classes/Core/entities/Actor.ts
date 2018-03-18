module WSA {
    export interface IActor {
        //getNewState(progress: number)
        shape: Sprite | Rect;
        id: number;
        v: Matter.Vector;
        body: Matter.Body
    }

    export abstract class Actor implements IActor{
        body: Matter.Body

        shape: Sprite | Rect;
        id: number;
        v:Matter.Vector;
        protected velocity: number;

        constructor(){   
            this.v = Matter.Vector.create(0,0);
            this.velocity = 5;
        }
        abstract setBody()
        //abstract getNewState(progress: number)
        
    }
}