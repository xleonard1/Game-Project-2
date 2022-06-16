import Phaser from 'phaser';
import initAnimations from './playerAnims';



class Skeleton extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'Skeleton');

        scene.add.existing(this);
        scene.physics.add.existing(this);




        this.init();
        this.initEvents()

    }
    init() {
        this.gravity = 1000;
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
        if (this.hasBeenHit || !this.body) { return }

        const onFloor = this.body.onFloor();

        if (onFloor) {

            this.play('Skeleton', true)
        }



    }

}


export default Skeleton;