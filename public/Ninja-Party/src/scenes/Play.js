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


    constructor() {
        super('PlayScene');

    }

    // Having this function imported from the Preload.js was returning an error of 'left is undefined'
    preload() {
        this.cursors = this.input.keyboard.createCursorKeys()
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    create() {

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

        //Animate ninja while attacking 
        this.anims.create({
            key: 'ninja1_attack',
            frames: [
                { key: 'ninja1_attack1', frame: null },
                { key: 'ninja1_attack2', frame: null },
                { key: 'ninja1_attack3', frame: null },
                { key: 'ninja1_attack4', frame: null },
                { key: 'ninja1_attack5', frame: null },
                { key: 'ninja1_attack6', frame: null }
            ],
            frameRate: 8,
            repeat: 0
        });

        //Sword animation during attack
        this.anims.create({
            key: 'ninja1_sword',
            frames: [
                { key: 'ninja1_sword1', frame: null },
                { key: 'ninja1_sword2', frame: null },
                { key: 'ninja1_sword3', frame: null },
                { key: 'ninja1_sword4', frame: null },
                { key: 'ninja1_sword5', frame: null },
                { key: 'ninja1_sword6', frame: null }
            ],
            frameRate: 8,
            repeat: 0
        });

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


        ninja1.body.gravity.y = 700;

        this.cameras.main.setBounds(0, 0, width * 3, height)
    }



    update() {
        const cam = this.cameras.main
        const speed = 4




        //Conditionals for player action/anmimation
        if (this.cursors.left.isDown) {
            //moveLeft
            console.log('left')
            cam.scrollX -= speed
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

        } else if (this.cursors.space.isDown) {
            ninja1.play('ninja1_attack')
            console.log('attack')
        } else { ninja1.setVelocityX(0) }

        // ninja1.play('ninja1_idle')


        if (ninja1.body.velocity.x !== 0) {
            ninja1.play('ninja1_run', true)
        } else if (ninja1.body.velocity.y > 0) {
            ninja1.play('ninja1_jump', true)
        } else { ninja1.play('ninja1_idle', true) }


    }
}


export default Play;