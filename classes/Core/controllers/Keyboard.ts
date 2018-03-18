module WSA {

  export interface IPressedKeys {
    left: boolean
    right: boolean
    up: boolean
    down: boolean
    space: boolean
  }

  export interface IKeyboard {
    init(onKeyPress: Function): void
    getKeys();
  }
  //WASD input
  enum keyMap {
    'right' = 68,
    'left' = 65,
    'up' = 87,
    'down' = 83,
    'space' = 32
  }

  export class Keyboard implements IKeyboard {

    private pressedKeys: IPressedKeys;
    private onKeyPress: Function;
    constructor(){
      this.pressedKeys = {
        left: false,
        right: false,
        up: false,
        down: false,
        space: false
      }
    }

    init(onKeyPress: Function) {
      this.onKeyPress = onKeyPress;
      window.addEventListener("keydown", this.keydown, false);
      window.addEventListener("keyup", this.keyup, false);
    }
    getKeys() {
      this.onKeyPress(this.pressedKeys);
      //return this.pressedKeys;
    }
    private keydown = (event: KeyboardEvent) => {
      var key = keyMap[event.keyCode]
      this.pressedKeys[key] = true
      this.getKeys();
    }
    private keyup = (event:KeyboardEvent) => {
      var key = keyMap[event.keyCode]
      this.pressedKeys[key] = false;
      this.getKeys();
    }
  }

}