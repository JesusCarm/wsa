/// <reference path="../entities/RigidEntity" />

module WSA {
    export interface ICollisionResolver {
        checkCollisions(entities: IEntity[]): void
    }
    export class CollisionResolver implements ICollisionResolver {
        checkCollisions(entities: IEntity[]): void {
            entities.forEach((entity: IRigidEntity, _i: number, entities: IEntity[]) => {
                if(entity.hasRigidBody) this.checkCollision(entity.id, entity.rigidBody, entities);
            });
        }

        private checkCollision(current:number, rigidBody: IRigidBody, entities: IEntity[]) {
            entities.forEach((entity: IRigidEntity, _i: number) => {
                if(!entity.hasRigidBody || current === entity.id ) return;
                let targetRigidBody = entity.rigidBody;
                if(!rigidBody.colliders.some((collider: rigidBodyType) => collider === targetRigidBody.bodyType)) return;
                this.collisionChecker(rigidBody.bounds,targetRigidBody.bounds);
            });
        }

        private collisionChecker(bounds: IBodyBounds, targetBounds: IBodyBounds){
            if(bounds.l > targetBounds.r || bounds.r < targetBounds.l || bounds.t > targetBounds.b || bounds.b < targetBounds.t) return;
            console.log("collision");
        }
    }
}