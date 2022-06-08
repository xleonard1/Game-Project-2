
import Phaser from 'phaser';

import PlayScene from './scenes/Play';

const WIDTH = 1280;
const HEIGHT = 800;

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT
}

const Scenes = [PlayScene];
const createScene = Scene => new Scene(SHARED_CONFIG)
const initScenes = () => Scenes.map(createScene)

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 }
    }
  },
  scene: initScenes()
};

new Phaser.Game(config);

function preload() {

}

function create() {

}
