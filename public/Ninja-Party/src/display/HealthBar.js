import Phaser from 'phaser';


class HealthBar {
    constructor(scene, x, y, health) {
        this.bar = new Phaser.GameObjects.Graphics(this.scene);
        this.bar.setScrollFactor(0)

        this.x = x;
        this.y = y;
        this.value = health;

        this.size = {
            width: 100,
            height: 20
        }

        this.pixelPerHealth = this.size.width / this.value;

        scene.add.existing(this.bar);
        this.draw(x, y)
    }

    decrease(amount) {
        this.value = amount
        this.draw(this.x, this.y)
    }

    draw(x, y) {
        this.bar.clear();
        const { width, height } = this.size;;
        const margin = 2;

        this.bar.fillStyle(0x051401);
        this.bar.fillRect(x, y, width + margin, height + margin);

        this.bar.fillStyle(0xFFFFFF)
        this.bar.fillRect(x + margin, y + margin, width - margin, height - margin);

        const healthWidth = Math.floor(this.value * this.pixelPerHealth);

        this.bar.fillStyle(0x00ff00);
        this.bar.fillRect(x + margin, y + margin, healthWidth - margin, height - margin);
    }

}




export default HealthBar;