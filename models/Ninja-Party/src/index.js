
import Phaser from 'phaser';

import PlayScene from './scenes/Play';
import PreloadScene from './scenes/Preload';


const WIDTH = 1280;
const HEIGHT = 800;

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT
}

const Scenes = [PreloadScene, PlayScene];
const createScene = Scene => new Scene(SHARED_CONFIG)
const initScenes = () => Scenes.map(createScene)

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
      checkCollision: {
        up: true,
        down: true,
        left: true,
        right: false
      },
      gravity: { y: 200 }
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: initScenes()
};


new Phaser.Game(config);



