import Phaser from 'phaser';
import Player from '../Entities/Player'

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

    constructor(config) {
        super('PlayScene');
        this.config = config;
    }



    create() {

        const width = this.scale.width
        const height = this.scale.height



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
            repeat: -1
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
            repeat: -1
        });

        createParallax(this, 1000, 'layer1', 0)
        createParallax(this, 1000, 'layer2', .1)
        createParallax(this, 1000, 'layer3', .2)
        createParallax(this, 1000, 'layer4', .3)
        createParallax(this, 1000, 'layer5', .4)
        createParallax(this, 1000, 'layer6', .5)
        createParallax(this, 1000, 'layer7', .6)
        createParallax(this, 1000, 'layer8', .7)
        createParallax(this, 1000, 'layer9', .8)
        createParallax(this, 1000, 'layer10', .9)
        createParallax(this, 1000, 'layer11', 1)

        const player = this.createPlayer();
        player.addCollider();
        this.createPlayerColliders(player, {
            colliders: {

            }
        })


        this.cameras.main.setBounds(0, 0, width * 1000, height);
        this.setupFollowupCameraOn(player);

    }



    update() {

    }

    createPlayer() {
        return new Player(this, 0.5, 0.5).setScale(4.3);
    }

    createPlayerColliders(player, { colliders }) { }

    setupFollowupCameraOn(player) {
        const speed = 4;
        this.cameras.main.startFollow(player).scrollX += speed
    }
}


export default Play;