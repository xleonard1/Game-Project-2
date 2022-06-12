import Phaser from 'phaser';
import Player from '../Entities/Player';
import Skeleton from '../Entities/Skeleton';

let platforms = null
let ninja1 = null
var player



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

        this.physics.world.setBounds(0, 0, this.width, 745)
        let Ground = 'layer11'
        const width = this.scale.width
        const height = this.scale.height


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


        this.enemyGroup = this.physics.add.group()
        const enemy = this.createManySprites(this, 100, Skeleton)


        const player = this.createPlayer();
        player.setCollideWorldBounds(true);

        this.physics.add.collider(player, this.enemyGroup)

        this.cameras.main.setBounds(0, 0, width * 1000, height);
        this.setupFollowupCameraOn(player);


    }

    update() {

    }



    createPlayer() {
        return new Player(this, 0.5, 0.5).setScale(4.3);
    }

    createEnemy() {
        return new Skeleton(this, 100, 0.5).setScale(2);
    }

    createPlayerColliders(player, { colliders }) {
        player.addCollider(enemy)
    }

    setupFollowupCameraOn(player) {
        const speed = 4;
        this.cameras.main.startFollow(player).scrollX += speed

    }
    createManySprites(scene, count, layer) {

        for (var i = 0; i < count; i++) {

            var enemy = this.physics.add.existing(new layer(this, Phaser.Math.Between(500, this.game.config.width + 10000), .5)).setScale(2).setFlipX(true);;
            this.enemyGroup.add(enemy)
            enemy.setCollideWorldBounds(true)
            enemy.setImmovable(true);
        }

    }



  
}


export default Play;