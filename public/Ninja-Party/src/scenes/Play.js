import Phaser from 'phaser';
import Player from '../Entities/Player';
import Skeleton from '../Entities/Skeleton';
var pv
const enemyArray = []
var player
const playerArray = []
var enemy
var ev

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
        playerArray.push(player)
        console.log(playerArray)



        this.physics.add.collider(player, this.enemyGroup)

        this.cameras.main.setBounds(0, 0, width * 1000, height);
        this.setupFollowupCameraOn(player);

    }

    // 60 cyles/sec
    update(time, delta) {

        const enemyDirection = this.checkDirection()
        const getPlayer = this.getPlayer()
        const nestedLoopNightmare = this.followTheLeader()
    }



    createPlayer() {
        return new Player(this, 100, 0.5).setScale(4.3);
    }

    createEnemy() {
        return new Skeleton(this, 100, 0.5).setScale(2);
    }

    setupFollowupCameraOn(player) {
        const speed = 4;
        this.cameras.main.startFollow(player).scrollX += speed

    }
    createManySprites(scene, count, layer) {

        for (var i = 0; i < count; i++) {

            var enemy = this.physics.add.existing(new layer(this, Phaser.Math.Between(500, this.game.config.width + 10000), .5)).setScale(2);;
            this.enemyGroup.add(enemy)
            enemy.setVelocityX(-(Math.random() * 100) + 40)
            enemyArray.push(enemy)
            const ev = enemy.body.velocity.x
            enemy.setCollideWorldBounds(true)
            enemy.setImmovable(true);

        }

    }

    getPlayer() {
        for (var i = 0; i < playerArray.length; i++) {
            if (playerArray[i].body.velocity.x < 0) {
                console.log('running left')
            }
        }
    }

    checkDirection() {
        for (var i = 0; i < enemyArray.length; i++) {
            if (enemyArray[i].body.velocity.x < 0) {
                enemyArray[i].setFlipX(true)
            } else if (enemyArray[i].body.velocity.x > 0)
                enemyArray[i].setFlipX(false)

        }
    }

    checkHowClose() {
        for (var i = 0; i < enemyArray.length; i++) {
            if (enemyArray[i].body.velocity.x < 0) {
                enemyArray[i].setFlipX(true)
            } else if (enemyArray[i].body.velocity.x > 0)
                enemyArray[i].setFlipX(false)

        }
    }

    followTheLeader() {
        for (var i = 0; i < enemyArray.length; i++) {
            for (var j = 0; j < playerArray.length; j++)
                if (enemyArray[i].body.x < playerArray[j].x && enemyArray[i].body.velocity.x < 0) {
                    enemyArray[i].setVelocityX(enemyArray[i].body.velocity.x * -1)
                } else if (enemyArray[i].body.x > playerArray[j].x && enemyArray[i].body.velocity.x > 0) {
                    enemyArray[i].setVelocityX(enemyArray[i].body.velocity.x * -1)
                } else if (enemyArray[i].body.x < playerArray[j].x && enemyArray[i].body.velocity.x > 0) {
                    enemyArray[i].setVelocityX(enemyArray[i].body.velocity.x)
                } else if (enemyArray[i].body.x > playerArray[j].x && enemyArray[i].body.velocity.x < 0) {
                    enemyArray[i].setVelocityX(enemyArray[i].body.velocity.x)
                }
        }
    }


}


export default Play;