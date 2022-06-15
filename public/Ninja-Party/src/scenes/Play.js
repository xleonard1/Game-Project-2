
import Phaser from 'phaser';
import Player from '../Entities/Player';
import Skeleton from '../Entities/Skeleton';


var currentScore = 0
var gameState = { score: currentScore };
var time_remaining
var clock
const enemyArray = []
var player
const playerArray = []
var enemy
var cursors
var health = 200
var healthBar
var timedEvent

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


        // this.initialTime = 150;

        // time_remaining = this.add.text(32, 32, 'Countdown: ' + this.formatTime(this.initialTime));

        // timedEvent = this.time.addEvent({ delay: 1000, callback: this.gameOver, callbackScope: this, loop: true });

        time_remaining = this.time.delayedCall(10000, this.gameOver);  // delay in ms


        cursors = this.input.keyboard.createCursorKeys();
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

        gameState.scoreText = this.add.text(23, 60, 'Score: 0', { fontSize: '25px', fill: '#000000' })
        gameState.scoreText.setScrollFactor(0)

        // clock.add.text
        // scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        this.enemyGroup = this.physics.add.group()
        const enemy = this.createManySprites(this, 100, Skeleton)





        const player = this.createPlayer();
        player.setCollideWorldBounds(true);
        playerArray.push(player)



        const healthBarBackground = this.makeBar(23, 25, 0xFFFFFF, health);
        const healthBar = this.makeBar(23, 25, 0x40E213, health);


        this.setValue(healthBar, 100);
        this.setValue(healthBarBackground, 100);

        healthBarBackground.setScrollFactor(0)
        healthBar.setScrollFactor(0)

        this.physics.add.collider(player, this.enemyGroup, this.takesHit)

        this.cameras.main.setBounds(0, 0, width * 1000, height);
        this.setupFollowupCameraOn(player);

    }

    // 60 cyles/sec
    update(time, delta) {


        const decrementHealth = this.decrementHealth()
        const killEnemy = this.killEnemy()
        const enemyDirection = this.checkDirection()
        const getPlayer = this.getPlayer()
        const followPLayer = this.followTheLeader()


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

            var enemy = this.physics.add.existing(new layer(this, Phaser.Math.Between(1000, this.game.config.width + 10000), .5)).setScale(2);;
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
                enemyArray[i].setFlipX(false)
            } else if (enemyArray[i].body.velocity.x > 0)
                enemyArray[i].setFlipX(true)

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

    killEnemy() {
        for (var i = 0; i < enemyArray.length; i++) {
            for (var j = 0; j < playerArray.length; j++) {
                if ((Math.abs(enemyArray[i].body.x - playerArray[j].body.x) < 108) && (Math.abs(enemyArray[i].body.y - playerArray[j].body.y) < 50) && cursors.space.isDown) {
                    enemyArray[i].setCollideWorldBounds(false).setVisible(false)
                    gameState.scoreText.setText('Score: ' + (currentScore += 5))

                }
            }
        }
    }

    decrementHealth() {
        for (var i = 0; i < enemyArray.length; i++) {
            for (var j = 0; j < playerArray.length; j++) {
                if ((Math.abs(enemyArray[i].body.x - playerArray[j].body.x) < 45) && (Math.abs(enemyArray[i].body.y - playerArray[j].body.y) < 50)) {
                    health -= 1
                    console.log(health)
                }
            }
        }
    }

    takesHit() {
        // if (this.hasBeenHit) { return };
        this.hasBeenHit = true;
        console.log('hit')
    }

    makeBar(x, y, color, length) {

        let bar = this.add.graphics();
        bar.fillStyle(color);
        bar.fillRect(0, 0, length, 25);
        bar.x = x;
        bar.y = y;

        bar.scaleX = 1
        return bar;
    }

    setValue(bar, percentage) {

        bar.scaleX = percentage / (100);
        console.log(percentage)
    }

    // returnScore(currentScore) {
    //     window.parent.postMessage(currentScore, ' = Your High Score')
    // }

    gameOver() {
        // console.log('timer works!')
        // console.log(currentScore)
        const message = JSON.stringify({
            message: currentScore,
            date: Date.now(),
        });
        window.parent.postMessage(message, '*')
    }


    formatTime(seconds) {
        // Minutes
        var minutes = Math.floor(seconds / 60);
        // Seconds
        var partInSeconds = seconds % 60;
        // Adds left zeros to seconds
        partInSeconds = partInSeconds.toString().padStart(2, '0');
        // Returns formated time
        return `${minutes}:${partInSeconds}`;
    }

    onEvent() {
        this.initialTime -= 1; // One second
        text.setText('Countdown: ' + formatTime(this.initialTime));
    }
}


export default Play;