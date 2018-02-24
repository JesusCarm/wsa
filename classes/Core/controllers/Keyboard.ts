module WSA {

  export interface IPressedKeys {
    left: boolean
    right: boolean
    up: boolean
    down: boolean
    space: boolean
  }

  export interface IKeyboard {
    init(): void
    getKeys(): IPressedKeys
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
    constructor(){
      this.pressedKeys = {
        left: false,
        right: false,
        up: false,
        down: false,
        space: false
      }
    }

    init() {
      window.addEventListener("keydown", this.keydown, false)
      window.addEventListener("keyup", this.keyup, false)
    }
    getKeys() {
      return this.pressedKeys;
    }
    private keydown = (event: KeyboardEvent) => {
      var key = keyMap[event.keyCode]
      this.pressedKeys[key] = true
    }
    private keyup = (event:KeyboardEvent) => {
      var key = keyMap[event.keyCode]
      this.pressedKeys[key] = false
    }
  }

}