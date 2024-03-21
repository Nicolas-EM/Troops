import * as Phaser from 'phaser';
import Client from '../client';

export default class Menu extends Phaser.Scene {
  createLobbyButton: Phaser.GameObjects.Text;
  joinLobbyButton: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'menu' });
  }

  create() {
    this.createLobbyButton = this.add.text(this.cameras.main.width / 2, 100, 'Create Lobby', { fontSize: '24px' }).setOrigin(0.5).setInteractive();
    this.createLobbyButton.on('pointerdown', () => this.createLobby());

    this.joinLobbyButton = this.add.text(this.cameras.main.width / 2, 200, 'Join Lobby', { fontSize: '24px' }).setOrigin(0.5).setInteractive();
    this.joinLobbyButton.on('pointerdown', () => this.joinLobby());
  }

  createLobby() {
    this.scene.start('lobby');
  }

  joinLobby() {
    this.scene.start('lobby', {lobbyCode: globalThis.lobbyCode});
  }
}