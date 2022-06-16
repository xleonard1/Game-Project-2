
import Phaser from 'phaser';
import Player from '../Entities/Player';
import Skeleton from '../Entities/Skeleton';
import EventEmitter from "../Emitters/Emitter.js"

var currentScore = 0
var gameState = { score: currentScore };
var time_remaining
var clock
const enemyArray = []
var playerHealth
const playerArray = []
var enemy
var enemyGroup
var cursors
var health = 200
var bar
var newBar
var timedEvent
var button
var message

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

        this.createGameEvents();
        //Get input from cursors
        cursors = this.input.keyboard.createCursorKeys();
        this.physics.world.setBounds(0, 0, this.width, 745)

        const width = this.scale.width
        const height = this.scale.height

        // Create background with scroll effect
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




        // startButton = Game Init
        var button = this.add.sprite(625, 400, "START");
        button.setInteractive();

        // Sprite Init
        button.on('pointerdown', () => {
            const player = this.createPlayer();
            player.setCollideWorldBounds(true);
            playerArray.push(player);
            this.setupFollowupCameraOn(player);
            player.health = 100;
            playerHealth = 0;
            let barBackground = this.add.graphics().fillStyle(0x24F00D).fillRect(25, 25, 200, 25).setScrollFactor(0)
            bar = this.add.graphics().fillStyle(0x24F00D).fillRect(25, 25, 200, 25).setScrollFactor(0)
            // console.log(player.health)
            // console.log(playerArray);
            this.enemyGroup = this.physics.add.group();
            const enemy = this.createManySprites(this, 100, Skeleton);
            this.physics.add.collider(player, this.enemyGroup, this.takesHit, () => newBar = this.add.graphics().fillStyle(0xF83400).fillRect(225, 25, playerHealth, 25)
                .setScrollFactor(0))
            // .setScaleX(((playerHealth / 100 * 100)))
        });

        // Properties Init
        button.on('pointerdown', () => {
            gameState.scoreText = this.add.text(23, 60, 'Score: 0', { fontSize: '25px', fill: '#000000' })
            gameState.scoreText.setScrollFactor(0);
            button.destroy(true)

            this.cameras.main.setBounds(0, 0, width * 1000, height);
        });

    }

    // 60 cyles/sec
    update(time, delta) {


        const killEnemy = this.killEnemy()
        const enemyDirection = this.checkDirection()
        const followPLayer = this.followTheLeader()


    }



    createPlayer() {
        return new Player(this, 100, 0.5).setScale(4.3).setCollideWorldBounds(true);
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

            var enemy = this.physics.add.existing(new layer(this, Phaser.Math.Between(1000, this.game.config.width + 10000), .5)).setScale(2);;
            this.enemyGroup.add(enemy)
            enemy.setVelocityX(-(Math.random() * 100) + 40)
            enemyArray.push(enemy)
            const ev = enemy.body.velocity.x
            enemy.setCollideWorldBounds(true)
            enemy.setImmovable(true);

        }

    }


    checkDirection() {

        for (var i = 0; i < enemyArray.length; i++) {
            if (!enemyArray[i].body) { return }
            if (enemyArray[i].body.velocity.x < 0) {
                enemyArray[i].setFlipX(true)
            } else if (enemyArray[i].body.velocity.x > 0)
                enemyArray[i].setFlipX(false)

        }
    }

    followTheLeader() {

        for (var i = 0; i < enemyArray.length; i++) {
            for (var j = 0; j < playerArray.length; j++) {
                if (!playerArray[j].body) { return }
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

    killEnemy() {

        for (var i = 0; i < enemyArray.length; i++) {
            if (!enemyArray[i].body) { return }
            for (var j = 0; j < playerArray.length; j++) {
                if ((Math.abs(enemyArray[i].body.x - playerArray[j].body.x) < 108) && (Math.abs(enemyArray[i].body.y - playerArray[j].body.y) < 50) && cursors.space.isDown) {
                    enemyArray[i].setCollideWorldBounds(false).setVisible(false)
                    gameState.scoreText.setText('Score: ' + (currentScore += 5))
                    console.log(currentScore)

                }
            }
        }
    }

    decrementHealth() {
        for (var i = 0; i < enemyArray.length; i++) {
            for (var j = 0; j < playerArray.length; j++) {
                if ((Math.abs(enemyArray[i].body.x - playerArray[j].body.x) < 45) && (Math.abs(enemyArray[i].body.y - playerArray[j].body.y) < 50)) {
                    // health -= 1
                    // console.log(health)
                }
            }
        }
    }

    takesHit() {
        // if (this.hasBeenHit) { return };
        this.hasBeenHit = true;
        // console.log('hit')
        if (playerHealth > -200)
            playerHealth -= 1;
        // console.log(playerHealth)

        bar.setVisible(false)

        if (playerHealth === -200) {
            let message = JSON.stringify({
                message: currentScore
            });
            window.parent.postMessage(message, '*')
            console.log(currentScore)
            EventEmitter.emit('GAME_OVER')


            return;
        }
    }

    createGameEvents() {
        EventEmitter.on('GAME_OVER', () => {
            this.scene.restart();
        })
    }



}






export default Play;