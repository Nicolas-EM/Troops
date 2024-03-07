import Phaser from 'phaser'

export default class Menu extends Phaser.Scene {
  constructor() {
    super({ key: 'menu' });
  }

  preload() {
    this.load.setPath('assets/sprites/');
  }

  create() {
    
  }
}