import Phaser from 'phaser';
import initAnimations from './playerAnims';
import collidable from '../mixins/collidable'

class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'ninja1');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Mixins // Creating an object with collidable properties for 'this' context
        Object.assign(this, collidable)

        this.init();
        this.initEvents();
    }
    init() {
        this.gravity = 500;
        this.playerSpeed = 250;
        this.jumpCount = 0;
        this.consecutiveJumps = 1;

        this.setSize(this.width - 54, this.height - 47)
        this.setOffset(26, 34)
        //While in Arcade super class .scene must be used since input is used in a scene context
        this.cursors = this.scene.input.keyboard.createCursorKeys();

        this.body.setGravityY(this.gravity);
        this.setCollideWorldBounds(true);

        initAnimations(this.scene.anims);
    }

    //Event listener used to get info from Scenes to run update() vs. the preUpdate life-cycle function
    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
    }


    update() {
        const { left, right, space, up } = this.cursors;
        const isUpJustDown = Phaser.Input.Keyboard.JustDown(up);
        const onFloor = this.body.onFloor();

        if (left.isDown) {
            this.setVelocityX(-this.playerSpeed);
            this.setFlipX(true);
        } else if (right.isDown) {
            this.setVelocityX(this.playerSpeed)
            this.setFlipX(false);
        } else {
            this.setVelocityX(0)
        }

        if (isUpJustDown && (onFloor || this.jumpCount < this.consecutiveJumps)) {
            this.setVelocityY(-this.playerSpeed * 2.5);
            this.jumpCount++;
        }

        if (onFloor) {
            this.jumpCount = 0;
        }

        onFloor ?
            this.body.velocity.x !== 0 ?
                this.play('ninja1_run', true) : this.play('ninja1_idle', true) : this.play('ninja1_jump', true)
    }

}


export default Player;