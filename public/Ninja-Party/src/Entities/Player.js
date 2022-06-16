import Phaser from 'phaser';
import initAnimations from './playerAnims';



class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        //Set super with game scene, coordinates, and sprite
        super(scene, x, y, 'ninja1');

        scene.add.existing(this);
        scene.physics.add.existing(this);


        //Add init function to player class
        this.init();
        this.initEvents();
    }
    init() {
        //Init default player gravity
        this.gravity = 500;
        //Init default player speed
        this.playerSpeed = 250;
        //Init jump count at 0 for double jump feature
        this.jumpCount = 0;
        //Allowable consecutive jumps
        this.consecutiveJumps = 1;
        //Set hasBeenHit boolean to default false
        this.hasBeenHit = false;
        //Assign default bounce velocity
        this.bounceVelocity = 250;
        //Player body size params
        this.setSize(this.width - 54, this.height - 47)
        //Offset character within body bounds
        this.setOffset(26, 34)
        //Set default health 100 for new game
        this.health = 100
        //Init player sounds
        this.jumpSound = this.scene.sound.add('jump', { loop: false, volume: 0.4 })
        this.swordSound = this.scene.sound.add('sword', { loop: false, volume: 0.2 })

        //While in Arcade super class .scene must be used since input is used in a scene context
        this.cursors = this.scene.input.keyboard.createCursorKeys();

        //Add sprite default physics to Player class
        this.body.setGravityY(this.gravity);
        this.setCollideWorldBounds(true);

        //Call animations from Anims
        initAnimations(this.scene.anims);
    }

    //Event listener used to get info from Scenes to run update() vs. the preUpdate life-cycle function
    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
    }

    //60 cycles/sec
    update() {
        //Get keyboard input for use in update function
        if (this.hasBeenHit || !this.body) { return }
        const { left, right, space, up } = this.cursors;
        const isUpJustDown = Phaser.Input.Keyboard.JustDown(up);
        const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(space);

        //Set condition of player touching bottom of World Bounds
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
            this.jumpSound.play()
            this.setVelocityY(-this.playerSpeed * 2.5);
            this.jumpCount++;
        }


        if (onFloor) {
            this.jumpCount = 0;
        }

        isSpaceJustDown ?
            this.play('ninja1_sword', true) && this.swordSound.play() :
            onFloor ?
                this.body.velocity.x !== 0 ?
                    this.play('ninja1_run', true) : this.play('ninja1_idle', true) : this.play('ninja1_jump', true)


    };



}


export default Player;