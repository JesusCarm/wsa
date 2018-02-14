module WSA {
    export interface IEntity {
        draw(): void
        update(progress:number)
    }

    export abstract class Entity implements IEntity {
        abstract update(progress:number)
        abstract draw()
    }
}