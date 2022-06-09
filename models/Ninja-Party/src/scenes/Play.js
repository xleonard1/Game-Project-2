import Phaser from 'phaser';
let platforms = null
let ninja1 = null

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
    }

    create() {


        //Here const map is calling key: 'map' whereas the const tilset1 is calling the actual associated .png file
        // const map = this.make.tilemap({ key: 'ground' });
        // const tileset1 = map.addTilesetImage('Layer', 'ground');

        //Animate ninja1 while idle 
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





        ninja1.setBounce(0.2);
        ninja1.setCollideWorldBounds(true);

        ninja1.body.gravity.y = 700;

        this.cameras.main.setBounds(0, 0, width * 3, height)
    }



    update() {
        const cam = this.cameras.main
        const speed = 4
        if (this.cursors.left.isDown) {
            //moveLeft
            console.log('left')
            cam.scrollX -= speed
        } else if (this.cursors.right.isDown) {
            cam.scrollX += speed
            console.log('right')
        }
    }
}


export default Play;