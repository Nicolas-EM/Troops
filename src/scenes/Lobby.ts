import Phaser from 'phaser'

export default class Lobby extends Phaser.Scene {
  constructor() {
    super({ key: 'lobby' });
  }

  preload() {
    this.load.setPath('assets/sprites/');
  }

  create() {
    
  }
}