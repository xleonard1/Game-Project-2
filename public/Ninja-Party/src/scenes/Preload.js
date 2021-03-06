import Phaser from 'phaser';


class Preload extends Phaser.Scene {


    constructor() {
        super('PreloadScene');

    }

    preload() {

        //Load music and soundFX
        this.load.audio('theme', 'assets/Sounds/theme.wav')
        this.load.audio('jump', 'assets/Sounds/jump.wav')
        this.load.audio('sword', 'assets/Sounds/sword.wav')

        //Initial load of ninja1
        this.load.image('ninja1', 'assets/Ninjas/ninja 1_idle_0.png')

        //Load images for ninja1 when idle
        this.load.image('ninja1_idle1', 'assets/Ninjas/ninja 1_idle_0.png');
        this.load.image('ninja1_idle2', 'assets/Ninjas/ninja 1_idle_1.png');
        this.load.image('ninja1_idle3', 'assets/Ninjas/ninja 1_idle_2.png');
        this.load.image('ninja1_idle4', 'assets/Ninjas/ninja 1_idle_3.png');
        this.load.image('ninja1_idle5', 'assets/Ninjas/ninja 1_idle_4.png');

        //Load images for ninja1 when running 
        this.load.image('ninja1_run1', 'assets/Ninjas/ninja 1_run_0.png');
        this.load.image('ninja1_run2', 'assets/Ninjas/ninja 1_run_1.png');
        this.load.image('ninja1_run3', 'assets/Ninjas/ninja 1_run_2.png');
        this.load.image('ninja1_run4', 'assets/Ninjas/ninja 1_run_3.png');
        this.load.image('ninja1_run5', 'assets/Ninjas/ninja 1_run_4.png');
        this.load.image('ninja1_run6', 'assets/Ninjas/ninja 1_run_5.png');
        this.load.image('ninja1_run7', 'assets/Ninjas/ninja 1_run_6.png');
        this.load.image('ninja1_run8', 'assets/Ninjas/ninja 1_run_7.png');

        //Load images for ninja1 when jumping
        this.load.image('ninja1_jump1', 'assets/Ninjas/ninja 1_jump_0.png');
        this.load.image('ninja1_jump2', 'assets/Ninjas/ninja 1_jump_1.png');
        this.load.image('ninja1_jump3', 'assets/Ninjas/ninja 1_jump_2.png');

        //Load images for ninja1 when attacking
        this.load.image('ninja1_attack1', 'assets/Ninjas/ninja 1_attack_0.png');
        this.load.image('ninja1_attack2', 'assets/Ninjas/ninja 1_attack_1.png');
        this.load.image('ninja1_attack3', 'assets/Ninjas/ninja 1_attack_2.png');
        this.load.image('ninja1_attack4', 'assets/Ninjas/ninja 1_attack_3.png');
        this.load.image('ninja1_attack5', 'assets/Ninjas/ninja 1_attack_4.png');
        this.load.image('ninja1_attack6', 'assets/Ninjas/ninja 1_attack_5.png');

        //Load sword animation
        this.load.image('ninja1_sword1', 'assets/Ninja-Attack/two hands sword 1_attack_0.png');
        this.load.image('ninja1_sword2', 'assets/Ninja-Attack/two hands sword 1_attack_1.png');
        this.load.image('ninja1_sword3', 'assets/Ninja-Attack/two hands sword 1_attack_2.png');
        this.load.image('ninja1_sword4', 'assets/Ninja-Attack/two hands sword 1_attack_3.png');
        this.load.image('ninja1_sword5', 'assets/Ninja-Attack/two hands sword 1_attack_4.png');
        this.load.image('ninja1_sword6', 'assets/Ninja-Attack/two hands sword 1_attack_5.png');

        //Load images for Skeleton when walking
        this.load.spritesheet('Skeleton', 'assets/Monsters/Skeleton/Walk.png', {
            frameWidth: 150, frameHeight: 150
        });

        //Load images for background layers
        this.load.image('layer1', 'assets/Background/Layer_1.png');
        this.load.image('layer2', 'assets/Background/Layer_2.png');
        this.load.image('layer3', 'assets/Background/Layer_3.png');
        this.load.image('layer4', 'assets/Background/Layer_4.png');
        this.load.image('layer5', 'assets/Background/Layer_4Lights.png');
        this.load.image('layer6', 'assets/Background/Layer_04Lights.png');
        this.load.image('layer7', 'assets/Background/Layer_5.png');
        this.load.image('layer8', 'assets/Background/Layer_6.png');
        this.load.image('layer9', 'assets/Background/Layer_7.png');
        this.load.image('layer10', 'assets/Background/Layer_8.png');
        this.load.image('layer11', 'assets/Background/Layer_9.png');

        //Load Tilemap for ground 
        this.load.tilemapTiledJSON('Ground', 'assets/Tilesets/Ground_Layer.json');

        //Load Start Button 
        this.load.image('START', 'assets/Background/START.png');


    }



    create() {
        this.scene.start('PlayScene')
    }



}


export default Preload;