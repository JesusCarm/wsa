module WSA {
    export class Game {
        private driver: IDriver;
        private canvas: ICanvas;
        constructor(body:HTMLBodyElement){    
            this.canvas = new WSA.Canvas();
            this.driver = new WSA.Driver(this.canvas);   
            this.canvas.init(body);
            this.init();
        }

        init(){
            let player = this.createPlayer();
            this.driver.registerEntity(player);
        }

        private createPlayer(){
            let playerConstruct: IRectangleConstruct = {
                x: 0,
                y: 0,
                width: 20,
                height: 20,
                fillStyle: "red"};
              
            return new WSA.Player(new WSA.Keyboard(), this.canvas.getContext(), playerConstruct);
        }
    }
}