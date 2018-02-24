/// <reference path="../entities/RigidEntity.ts" />

module WSA {
    export interface ICollisionResolver {
        checkCollisions(entities: IEntity[]): void
    }
    export class CollisionResolver implements ICollisionResolver {
        resolveActorsCollisions(actors: IActor[]){
            actors.forEach((actor: IActor) => {
                actor;
            });
        }
        checkCollisions(entities: IEntity[]): void {
            entities.forEach((entity: IActor, _i: number, entities: IActor[]) => {
                if(entity.hasRigidBody) this.checkCollision(entity, entities);
            });
        }

        private checkCollision(currentEntity: IRigidEntity, entities: IEntity[]) {
            entities.forEach((targetEntity: IRigidEntity, _i: number) => {
                if(!targetEntity.hasRigidBody || currentEntity.id === targetEntity.id ) return;
                let targetRigidBody = targetEntity.rigidBody;
                if(!currentEntity.rigidBody.colliders.some((collider: rigidBodyType) => collider === targetRigidBody.bodyType)) return;
                
                if(this.collisionChecker(currentEntity.rigidBody.bounds,targetRigidBody.bounds)){
                    //currentEntity.setTargetCollider(targetEntity.rigidBody);
                    currentEntity.resolveCollision(targetEntity);
                }
            });
        }

        private collisionChecker(bounds: IBodyBounds, targetBounds: IBodyBounds): boolean{
            if(bounds.l > targetBounds.r || bounds.r < targetBounds.l || bounds.t > targetBounds.b || bounds.b < targetBounds.t) return false;
            return true;
            // if(bounds.l < targetBounds.r  ){
            //     return 
            // }
        }
    }
}