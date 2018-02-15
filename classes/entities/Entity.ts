module WSA {
    export interface IEntity {
        id: number
        hasRigidBody: boolean
        draw(): void
        update(progress:number)
    }
    export abstract class Entity implements IEntity {
        private _id: number;
        public hasRigidBody: boolean = false;
        abstract update(progress:number)
        abstract draw()
        get id(){
            return this._id;
        }
        set id(id: number){
            this._id = id;
        }
    }
}