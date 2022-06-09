import Phaser from 'phaser';
let platforms = null
let ninja1 = null
let Ground = 'layer11'






const createParallax = (scene, count, layer, scrollFactor) => {
    let x = 0
    for (let i = 0; i < count; i++) {
        const m = scene.add.image(x, scene.scale.height, layer)
            .setOrigin(0, 1)
            .setScrollFactor(scrollFactor)

        x += m.width
    }

}




class Play extends Phaser.Scene {


class Play extends Phaser.Scene {

    // public/assets/Layer_0.png



    constructor() {
        super('PlayScene');

    }

    // Having this function imported from the Preload.js was returning an error of 'left is undefined'
    preload() {
        this.cursors = this.input.keyboard.createCursorKeys()

    // public/assets/Layer_0.png
    // public/assets/Layer_1.png
    preload() {
        this.cursors = this.input.keyboard.createCursorKeys()

        this.load.image('layer1', 'assets/Layer_1.png');
        this.load.image('layer2', 'assets/Layer_2.png');
        this.load.image('layer3', 'assets/Layer_3.png');
        this.load.image('layer4', 'assets/Layer_4.png');
        this.load.image('layer5', 'assets/Layer_4Lights.png');
        this.load.image('layer6', 'assets/Layer_04Lights.png');
        this.load.image('layer7', 'assets/Layer_5.png');
        this.load.image('layer8', 'assets/Layer_6.png');
        this.load.image('layer9', 'assets/Layer_7.png');
        this.load.image('layer10', 'assets/Layer_8.png');
        this.load.image('layer11', 'assets/Layer_9.png');

        this.load.audio('theme', 'assets/Chippy Music 12.wav');

    // Having this function imported from the Preload.js was returning an error of 'left is undefined'
    preload() {
        this.cursors = this.input.keyboard.createCursorKeys()


    }

    create() {



        // playMusic = () => {
        //     this.sound.add('theme', { loop: true, volume: 100 })
        // }

        // this.playMusic()


        //Here const map is calling key: 'map' whereas the const tilset1 is calling the actual associated .png file
        // const map = this.make.tilemap({ key: 'ground' });
        // const tileset1 = map.addTilesetImage('Layer', 'ground');

        //Animate ninja1 while idle 

        this.anims.create({
            key: 'ninja1_idle',
            frames: [
                { key: 'ninja1_idle1', frame: null },
                { key: 'ninja1_idle2', frame: null },
                { key: 'ninja1_idle3', frame: null },
                { key: 'ninja1_idle4', frame: null },
                { key: 'ninja1_idle5', frame: null }
            ],
            frameRate: 8,
            repeat: -1
        });

        //Animate ninja while running
        this.anims.create({
            key: 'ninja1_run',
            frames: [
                { key: 'ninja1_run1', frame: null },
                { key: 'ninja1_run2', frame: null },
                { key: 'ninja1_run3', frame: null },
                { key: 'ninja1_run4', frame: null },
                { key: 'ninja1_run5', frame: null },
                { key: 'ninja1_run6', frame: null },
                { key: 'ninja1_run7', frame: null },
                { key: 'ninja1_run8', frame: null }
            ],
            frameRate: 8,
            repeat: -1
        });

        //Animate ninja while jumping
        this.anims.create({
            key: 'ninja1_jump',
            frames: [
                { key: 'ninja1_jump1', frame: null },
                { key: 'ninja1_jump2', frame: null },
                { key: 'ninja1_jump3', frame: null }
            ],
            frameRate: 8,
            repeat: -1
        });

        // this.anims.create({
        //     key: 'ninja1_idle',
        //     frames: [
        //         { key: 'ninja1_idle1', frame: null },
        //         { key: 'ninja1_idle2', frame: null },
        //         { key: 'ninja1_idle3', frame: null },
        //         { key: 'ninja1_idle4', frame: null },
        //         { key: 'ninja1_idle5', frame: null, duration: 100 }
        //     ],
        //     frameRate: 5,
        //     repeat: -1
        // });

        ninja1 = this.physics.add.sprite(.5, .5, 'ninja1').setOrigin(0).setScale(4.3)



        const width = this.scale.width
        const height = this.scale.height

        createParallax(this, 10, 'layer1', 0)
        createParallax(this, 10, 'layer2', .1)
        createParallax(this, 10, 'layer3', .2)
        createParallax(this, 10, 'layer4', .3)
        createParallax(this, 10, 'layer5', .4)
        createParallax(this, 10, 'layer6', .5)
        createParallax(this, 10, 'layer7', .6)
        createParallax(this, 10, 'layer8', .7)
        createParallax(this, 10, 'layer9', .8)
        createParallax(this, 10, 'layer10', .9)
        createParallax(this, 10, 'layer11', 1)

        //Create Tile maps for Ground
        Ground = this.add.image(0, 0, 'layer11').setOrigin(0, 0);
        // backgroundImage.setScale(1);
        // const map = this.make.tilemap({ key: 'Ground' });
        // const tileset = map.addTilesetImage('Ground_Layer', 'layer11');
        // const platforms = map.createStaticLayer('Ground', tileset, 0, 0);
        // platforms.setCollisionByExclusion(-1, true);

        ninja1 = this.physics.add.sprite(.5, .5, 'ninja1').setOrigin(0).setScale(4.3)

        ninja1.play('ninja1_idle')

        // this.physics.add.collider(ninja1, Ground)

        ninja1.setBounce(0.1);

        ninja1.setCollideWorldBounds(true);

        ninja1.body.checkCollision = { up: true, down: true, left: false, right: false };
        ninja1.body.gravity.y = 700;



        // this.add.image(.5, .5, 'layer1').setOrigin(0).setScrollFactor(0);
        // this.add.image(.5, .5, 'layer2').setOrigin(0).setScrollFactor(.1);;
        // this.add.image(.5, .5, 'layer3').setOrigin(0).setScrollFactor(.2);;
        // this.add.image(.5, .5, 'layer4').setOrigin(0).setScrollFactor(.3);;
        // this.add.image(.5, .5, 'layer5').setOrigin(0).setScrollFactor(.4);;
        // this.add.image(.5, .5, 'layer6').setOrigin(0).setScrollFactor(.5);;
        // this.add.image(.5, .5, 'layer7').setOrigin(0).setScrollFactor(.6);;
        // this.add.image(.5, .5, 'layer8').setOrigin(0).setScrollFactor(.7);;
        // this.add.image(.5, .5, 'layer9').setOrigin(0).setScrollFactor(.8);;
        // this.add.image(.5, .5, 'layer10').setOrigin(0).setScrollFactor(.9);;
        // this.add.image(.5, .5, 'layer11').setOrigin(0).setScrollFactor(1);;





        ninja1.setBounce(0.2);
        ninja1.setCollideWorldBounds(true);

        ninja1.body.gravity.y = 700;



        this.cameras.main.setBounds(0, 0, width * 3, height)
    }



    update() {
        const cam = this.cameras.main

        const speed = 4


        this.physics.add.collider(ninja1, Ground)


        const speed = 3

        const speed = 4


        if (this.cursors.left.isDown) {
            //moveLeft
            console.log('left')

            ninja1.setFlipX(true)
            ninja1.setVelocityX(-270)
            console.log(ninja1.velocityX)

        } else if (this.cursors.right.isDown) {
            cam.scrollX += speed
            ninja1.setVelocityX(270)
            ninja1.setFlipX(false)

            console.log('right')
        } else if (this.cursors.up.isDown && ninja1.body.velocity.x < 0) {

            ninja1.setVelocityY(-330)
            ninja1.setFlipX(true)
            ninja1.play('ninja1_jump', true)
            console.log('jump')
        } else if (this.cursors.up.isDown) {
            ninja1.setVelocityY(-330)
            ninja1.setFlipX(false)
            ninja1.play('ninja1_jump', true)
            console.log('jump')
        } else { ninja1.setVelocityX(0) }

        // ninja1.play('ninja1_idle')


        if (ninja1.body.velocity.x !== 0) {
            ninja1.play('ninja1_run', true)
        } else if (ninja1.body.velocity.y > 0) {
            ninja1.play('ninja1_jump', true)
        } else { ninja1.play('ninja1_idle', true) }


    }
}



        } else if (this.cursors.right.isDown) {
            cam.scrollX += speed
            console.log('right')
        }
    }
}


export default Play;