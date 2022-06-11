export default {
    addCollider(otherGameObject, callback) {
        this.scene.physics.add.collider(this, otherGameObject, null, this)
    }
}