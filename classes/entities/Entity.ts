module WSA {
    export interface IEntity {
        id: number
        hasRigidBody: boolean
        draw(): void
        update(progress:number)
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
        abstract update(progress:number)
        abstract draw()
        get id(){
            return this._id;
        }
        set id(id: number){
            this._id = id;
        }
        protected saveState(){
            this.oldState.hasRigidBody.push(this.hasRigidBody);
        }
        protected restoreState(){
            this.hasRigidBody = this.oldState.hasRigidBody.pop();
        }
    }
}