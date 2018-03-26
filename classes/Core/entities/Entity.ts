module WSA {
    export interface IEntity {
        body: Matter.Body
        sprite: Sprite;
    }
    export abstract class Entity implements IEntity {
        body: Matter.Body
        sprite: Sprite;
        constructor(){
        }
    }
}