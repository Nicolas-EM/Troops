import Phaser from 'phaser'

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'game' });
  }

  preload() {
    this.load.setPath('assets/sprites/');
  }

  create() {
    
  }
}