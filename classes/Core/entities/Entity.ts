module WSA {
    export interface IEntity {
        id: number
        hasRigidBody: boolean
        init()
        draw(): void
        update()
    }
    export interface IEntityState {
        hasRigidBody: boolean[]
    }

    export abstract class Entity implements IEntity {
        public hasRigidBody: boolean;
        protected oldState: IEntityState;
        private _id: number;
        constructor(){
            this.hasRigidBody = false;
            this.oldState = {
                hasRigidBody: []
            };
        }
        // abstract getNewState(progress:number)
        init(){}
        get id(){
            return this._id;
        }
        set id(id: number){
            this._id = id;
        }
        abstract update()
        abstract draw()
    }
}