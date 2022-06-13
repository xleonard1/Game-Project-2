import Phaser from 'phaser';
import initAnimations from './playerAnims';
import collidable from '../mixins/collidable'


class Skeleton extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'Skeleton');

        scene.add.existing(this);
        scene.physics.add.existing(this);


        // Mixins // Creating an object with collidable properties for 'this' context
        Object.assign(this, collidable)

        this.init();
        this.initEvents()

    }
    init() {
        this.gravity = 500;
        this.speed = 250;

        this.setSize(this.width - 120, this.height - 99)
        this.setOffset(60, 49)

        this.setImmovable(true)
        this.setCollideWorldBounds(true);
        this.setOrigin(0.5, 1);
        this.body.setGravityY(this.gravity);


        initAnimations(this.scene.anims);


    }

    //Event listener used to get info from Scenes to run update() vs. the preUpdate life-cycle function
    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
    }

    update() {

        const onFloor = this.body.onFloor();

        if (onFloor) {

            this.play('Skeleton', true)
        }

        this.setVelocityX(-100)

    }

}


export default Skeleton;