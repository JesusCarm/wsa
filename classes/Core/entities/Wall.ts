/// <reference path="../../Core/controllers/Keyboard.ts" />
/// <reference path="../../Core/engine/Vector/Vector2.ts" />
/// <reference path="../../Core/entities/RigidEntity.ts" />

module WSA {

    export interface IWall {
    }

    export class Wall extends RigidEntity implements IWall {
        sprite: Sprite;

        constructor(protected engine: IEngine, sprite: Sprite){
            super(engine);
        }     

    }
}